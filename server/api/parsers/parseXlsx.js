const { set, isPlainObject, get } = require('lodash');
const Excel = require('exceljs');
const httpError = require('http-errors');
const multer = require('multer');

const keyedMapping = (header, mapping) => mapping.map((m) => {
  const {
    caseInsensitive = true,
    trim = true,
    singleSpace = false,
    wordsOnly = true,
    ignoreSpace = true,
  } = m?.opts || {};
  return {
    ...m,
    arrKey: header.findIndex((k) => {
      let ke = String(k ?? '');

      if (caseInsensitive) ke = ke.toLowerCase();
      if (trim) ke = ke.trim();
      if (singleSpace) ke = ke.replace(/ +(?= )/g, '');
      if (wordsOnly) ke = ke.replace(/[^ \w]/g, '');
      if (ignoreSpace) ke = ke.replace(' ', '');

      if (m.key instanceof RegExp) return m.key.test(ke);

      return m.key === ke;
    }),
  };
});

const fuzzyMap = (ws, mapping = [], headerRow = 1) => {
  if (!ws.actualRowCount) return [];

  const header = ws.getRow(headerRow).values;
  const mappers = keyedMapping(header, mapping);
  const out = [];

  ws.eachRow((row, rowNum) => {
    if (rowNum <= headerRow) return;
    const mapped = {};

    mappers.forEach(({
      arrKey,
      key,
      to,
      getter = (v) => v,
    }) => {
      let value = arrKey !== -1 ? row.values[arrKey] : undefined;
      if (isPlainObject(value)) {
        value = !get(value, 'result.error')
          ? get(value, 'result')
          : undefined;
      }
      set(mapped, to || key, getter(value, row, row.values[arrKey]));
    });
    out.push(mapped);
  });

  return out;
};

module.exports = ({
  uploadSettings: {
    field = 'file',
    ...uploadSettings
  } = {},
  mapping,
}) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    ...uploadSettings,
  });

  return [
    upload.single(field),
    async (req, res, next) => {
      if (!req[field]) { return next(httpError(400, 'res.badRequest')); }

      const input = req[field].buffer;

      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(input);

      // If mappping is array of array
      if (Array.isArray(mapping) && Array.isArray(mapping[0])) {
        const out = [];
        workbook.eachSheet((sheet) => {
          const mapped = fuzzyMap(sheet, mapping[0]);
          out.push(mapped);
        });
        req.attrs = out;
      }

      // If map only first sheet
      if (Array.isArray(mapping) && isPlainObject(mapping[0])) {
        const mapped = fuzzyMap(workbook.worksheets[0], mapping);
        req.attrs = mapped;
      }

      // If Object of mappings
      if (isPlainObject(mapping)) {
        const out = {};
        Object.keys(mapping).forEach((sheetName) => {
          out[sheetName] = fuzzyMap(
            workbook.getWorksheet(sheetName),
            mapping[sheetName],
          );
        });
        req.attrs = out;
      }

      return next();
    },
  ];
};

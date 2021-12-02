const _ = require('lodash');
const multer = require('multer');
const csv = require('csv-parse');

const fuzzyKey = (obj, key, {
  caseInsensitive = true,
  trim = true,
  singleSpace = false,
  wordsOnly = true,
  ignoreSpace = true,
} = {}) => {
  // match exact first
  if (!(key instanceof RegExp) && obj[key] !== undefined) {
    return key;
  }

  const match = Object.keys(obj).find((k) => {
    let ke = k;

    if (caseInsensitive) ke = ke.toLowerCase();
    if (trim) ke = ke.trim();
    if (singleSpace) ke = ke.replace(/ +(?= )/g, '');
    if (wordsOnly) ke = ke.replace(/[^ \w]/g, '');
    if (ignoreSpace) ke = ke.replace(' ', '');

    if (key instanceof RegExp) return key.test(ke);

    return key === ke;
  });

  return match;
};

const fuzzyMap = (rows = [], cols = []) => {
  if (!rows.length) return [];

  const mappers = [];

  // sample 1st row
  cols.forEach((col) => {
    if (col.key instanceof RegExp && !col.to) {
      throw new Error('"to" is required if "key" is a regex');
    }

    const match = fuzzyKey(rows[0], col.key, col.opts);

    mappers.push({ ...col, col: match });
  });

  return rows.map((r) => {
    const mapped = {};

    mappers.forEach(({
      col, key, to, getter = (v) => v,
    }) => {
      _.set(mapped, to || key, getter(
        col ? r[col] : undefined,
        r,
      ));
    });

    return mapped;
  });
};

module.exports = ({
  uploadSettings: {
    field = 'file',
    ...uploadSettings
  } = {},
  parserSettings = {},
  mapping,
} = {}) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    ...uploadSettings,
  });

  return [
    upload.single(field),
    (req, res, next) => {
      const input = req[field].buffer.toString();

      csv(input, {
        columns: true,
        skip_empty_lines: true,
        ...parserSettings,
      }, (err, output) => {
        if (err) {
          return res.status(404).send('invalid csv format');
        }

        req.attrs = mapping
          ? fuzzyMap(output, mapping)
          : output;

        return next();
      });
    },
  ];
};

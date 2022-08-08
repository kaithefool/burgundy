const { startCase, get, merge } = require('lodash');
const excel = require('exceljs');

function csvHeader(mapping) {
  return mapping.map(
    ({ key, label }) => label || startCase(key),
  );
}

function csvRow(req, mapping, data, widths) {
  return mapping.map((m, i) => {
    const k = typeof m.key === 'function'
      ? m.key(data, req)
      : m.key;
    let v = get(data, k);

    if (m.getter) v = m.getter(v, data, req);

    widths[i] = Math.max(widths[i], String(v).length);

    return v ?? '';
  });
}

const applyStyles = (isHeader = false, mapping = []) => (c, colNo) => {
  const {
    col = {},
    header = {},
    cell = {},
  } = mapping[colNo - 1] || {};
  const merges = merge({}, col, {
    ...(isHeader ? header : cell),
  });
  // For detail styles, see: https://github.com/exceljs/exceljs#styles
  Object.entries(merges).forEach(([k, v]) => {
    c[k] = typeof v === 'function' ? v(c.value) : v;
  });
};

const addRow = (ws, mapping, widths, req, doc) => {
  const row = ws.addRow(csvRow(req, mapping, doc, widths));
  row.eachCell(applyStyles(false, mapping));
  return row;
};

module.exports = (options) => async (req, res) => {
  const { out } = res.locals;

  const opts = typeof options === 'function' ? options(out) : options;
  const {
    mapping,
    filename = 'export.xlsx',
    sheetName = 'Sheet1',
    sheetMeta = {},
    useSharedStrings = true,
    useStyles = true,
  } = opts;

  res.attachment(filename);

  const workbook = new excel.stream.xlsx.WorkbookWriter({
    useStyles,
    useSharedStrings,
    stream: res,
  });

  const widths = csvHeader(mapping).map((h) => h.length);

  const ws = workbook.addWorksheet(sheetName, sheetMeta);
  ws.addRow(csvHeader(mapping)).eachCell(
    applyStyles(true, mapping),
  );

  if (out.pipe) {
    await out.eachAsync((doc) => {
      addRow(ws, mapping, widths, req, doc);
    });
  } else {
    out.forEach((doc) => addRow(ws, mapping, widths, req, doc));
  }

  widths.forEach((w, i) => {
    ws.getColumn(i + 1).width = (mapping[i]?.colWidth || w) * 1.1;
  });
  ws.commit();
  await workbook.commit();
};

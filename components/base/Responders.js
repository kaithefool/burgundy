const { startCase, get } = require('lodash');
const csv = require('csv-stringify');

function csvRow(req, mapping, data) {
  return mapping.map(((m) => {
    const k = typeof m.key === 'function'
      ? m.key(data, req)
      : m.key;
    let v = get(data, k);

    if (m.getter) v = m.getter(v, data, req);

    return v !== undefined && v !== null ? String(v) : '';
  }));
}

function csvHeader(mapping) {
  return mapping.map(({ key, label }) => (
    label || startCase(key)
  ));
}

exports.csv = (opts) => (req, res) => {
  const { out } = res.locals;
  const BOM = String.fromCharCode(0xFEFF);
  const stringifier = csv(); // csv stringifier
  let { mapping } = opts;

  if (typeof mapping === 'function') mapping = mapping(out, req);

  // setup http headers
  res.attachment('export.csv');

  // indicate the file is encoded in utf-8
  res.write(BOM);

  // csv header
  stringifier.write(csvHeader(mapping));

  if (out.pipe) {
    out
      .map((doc) => csvRow(req, mapping, doc))
      .pipe(stringifier)
      .pipe(res);
  } else {
    stringifier.pipe(res);
    out.forEach((o) => stringifier.write(
      csvRow(req, mapping, o),
    ));
  }
};

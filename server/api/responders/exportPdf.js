const fs = require('fs').promises;
const path = require('path');
const _ = require('lodash');
const { jsPDF: JsPDF } = require('jspdf');
const { applyPlugin } = require('jspdf-autotable');

applyPlugin(JsPDF);

const fonts = {
  'Noto Sans': {
    normal: {
      100: 'NotoSansCJKhk-100.ttf',
      300: 'NotoSansCJKhk-300.ttf',
      400: 'NotoSansCJKhk-400.ttf',
      500: 'NotoSansCJKhk-500.ttf',
      700: 'NotoSansCJKhk-700.ttf',
      900: 'NotoSansCJKhk-900.ttf',
    },
  },
};

const readFontFile = (filename) => fs.readFile(
  path.resolve(__dirname, `../assets/fonts/${filename}`),
);

const initDoc = (doc) => {
  const { addFont, setFont } = doc;

  doc.addFont = async (filename, name, style, weight) => {
    const file = await readFontFile(filename);

    doc.addFileToVFS(filename, file.toString('binary'));
    addFont.call(doc, filename, name, style, weight);
  };
  doc.setFont = async (name, style, weight) => {
    const filename = _.get(fonts, `${name}.${style}.${weight}`);

    if (filename) {
      await doc.addFont(filename, name, style, weight);
    }

    setFont.call(doc, name, style, weight);
  };

  return doc;
};

module.exports = (options = {}) => async (req, res) => {
  const { out } = res.locals;
  const opts = typeof options === 'function' ? options(out) : options;
  const { filename = 'export.pdf' } = opts;
  const mapping = typeof opts.mapping === 'function'
    ? opts.mapping(out, req)
    : opts.mapping;

  // setup http headers
  res.attachment(filename);

  const doc = initDoc(new JsPDF());

  await doc.setFont('Noto Sans', 'normal', 400);

  doc.text('人皆生而自由', 5, 10);
  doc.text('在尊嚴及權利上均各平等', 10, 20);

  doc.autoTable({
    head: [['Name', 'Email', 'Country']],
    body: [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
      // ...
    ],
  });

  const buf = Buffer.from(
    doc.output('arraybuffer'),
  );

  return res.send(buf);
};

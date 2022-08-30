const fs = require('fs').promises;
const path = require('path');
const _ = require('lodash');
const { jsPDF: JsPDF } = require('jspdf');
const { applyPlugin } = require('jspdf-autotable');
const { mapRow, mapHeader } = require('./helpers');

applyPlugin(JsPDF);

const demo = '鑑於對人類家庭所有成員的固有尊嚴及其平等的和不移的權利的承認，乃是世界自由、正義與和平的基礎， 鑑於對人權的無視和侮蔑已發展為野蠻暴行，這些暴行沾污了人類的良心，而一個人人享有言論和信仰自由並免予恐懼和匱乏的世界的來臨，已被宣布為普通人民的最高願望， 鑑於為使人類不致迫不得已鋌而走險對暴政和壓迫進行反叛，有必要使人權受法治的保護， 鑑於有必要促進各國間友好關係的發展， 鑑於各聯合國國家的人民已在聯合國憲章中重申他們對基本人權、人格尊嚴和價值以及男女平等權利的信念，並痩心促成較大自由中的社會進步和生活水平的改善， 鑑於各會員國並已誓願同聯合國合作以促進對人權和基本自由的普遍尊重和遵行， 鑑於對這些權利和自由的普遍了解對於這個誓願的充分實現具有很大的重要性';

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

/**
 *
 * @param {JsPDF} doc
 * @returns {JsPDF}
 */
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
  doc.autoText = (str) => {
    const { width } = doc.internal.pageSize;
    const txt = doc.splitTextToSize(str, width - 28);

    doc.text(txt, 14, 18);
  };

  return doc;
};

module.exports = (options = {}) => async (req, res) => {
  const { out } = res.locals;
  const opts = typeof options === 'function' ? options(out) : options;
  const {
    filename = 'export.pdf',
    write,
  } = opts;
  let { mapping, title = 'Exports' } = opts;

  if (typeof mapping === 'function') mapping = mapping(out, req);
  if (typeof title === 'function') title = title(out, req);

  // setup http headers
  res.attachment(filename);

  const doc = initDoc(new JsPDF());

  await doc.setFont('Noto Sans', 'normal', 400);

  doc.outTable = (tableOpts) => {
    doc.autoTable({
      head: [mapHeader(mapping)],
      body: out.map((o) => mapRow(req, mapping, o)),
      styles: {
        font: 'Noto Sans',
        fontSize: 8,
      },
      headStyles: {
        fillColor: '#333333',
      },
      ...tableOpts,
    });
  };

  doc.setFontSize(14);
  doc.autoText(title);
  doc.outTable({ startY: 24 });

  const buf = Buffer.from(
    doc.output('arraybuffer'),
  );

  return res.send(buf);
};

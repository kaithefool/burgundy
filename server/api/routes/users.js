const { object, array } = require('yup');

const { Routes } = require('../base');
const service = require('../services/users');
const { email, password } = require('../validators');
const exportCsv = require('../responders/exportCsv');
const exportXlsx = require('../responders/exportXlsx');
const parseCsv = require('../parsers/parseCsv');
const parseXlsx = require('../parsers/parseXlsx');

module.exports = new Routes({
  service,
  authorize: 'admin',
  validate: {
    create: object({
      email: email().required(),
      password: password().required(),
    }),
    patch: object({
      email: email(),
      password: password(),
    }),
    import: array().of(object({
      email: email().required(),
    })),
  },
}, {
  list: true,
  findById: true,
  create: true,
  patch: true,
  patchActive: {
    path: '/active/:_id?',
    method: 'patch',
  },
  delete: true,

  import: {
    path: '/import',
    method: 'post',
    serve: 'create',
    parse: parseCsv({
      mapping: [
        { key: 'email' },
        { key: 'englishname', to: 'name.en' },
        { key: 'role', getter: () => 'client' },
      ],
    }),
  },

  importXlsx: {
    path: '/import/xlsx',
    method: 'post',
    parse: parseXlsx({
      mapping: [
        { key: 'email' },
        { key: 'englishname', to: 'name.en' },
        { key: 'role', getter: () => 'client' },
      ],
    }),
  },

  export: {
    path: '/export',
    serve: 'find',
    response: exportCsv({
      filename: 'users-export.csv',
      mapping: [
        { key: 'email' },
        { key: 'name.en', label: 'English Name' },
      ],
    }),
  },

  exportXlsx: {
    path: '/export/xlsx',
    serve: 'find',
    response: exportXlsx({
      filename: 'users-export.xlsx',
      mapping: [
        { key: 'email' },
        {
          key: 'name.en',
          label: 'English Name',
          getter: (v, doc) => `${doc?.name?.en || 'Nameless'} (${v})`,
        },
        {
          key: 'role',
          cell: {
            fill: (v) => (v !== 'client' ? {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'F08080' },
            } : undefined),
          },
        },
        {
          key: 'createdAt',
          colWidth: 12,
          col: { font: { name: 'Times New Roman' } },
          header: { font: { bold: true } },
          cell: { font: { underline: true }, numFmt: 'yyyy-mm-dd' },
        },
      ],
    }),
  },
});

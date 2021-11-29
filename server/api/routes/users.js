const { object } = require('yup');

const { Routes } = require('../base');
const service = require('../services/users');
const { email, password } = require('../validators');
const exportCsv = require('../responders/exportCsv');

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
  },
}, {
  list: true,
  find: true,
  create: true,
  patch: true,
  patchActive: {
    path: '/active/:_id?',
    method: 'patch',
  },
  delete: true,

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
});

const { object } = require('yup');

const { Routes } = require('../base');
const service = require('../services/users');
const { email, password } = require('../validators');

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
});

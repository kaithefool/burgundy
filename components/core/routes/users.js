const { object } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/users');
const { email, password } = require('../validators');

module.exports = new Routes({
  service,
  authorize: {
    // patch: 'admin',
    // delete: 'admin',
  },
  validate: {
    create: object({
      email: email().required(),
      password: password().required(),
    }),
    patch: object({
      email: email().required(),
    }),
  },
}, {
  list: true,
  find: true,
  create: true,
  patch: true,
  delete: true,
});

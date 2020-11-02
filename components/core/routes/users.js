const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/users');

module.exports = new Routes({
  service,
  authorize: {
    patch: 'admin',
    delete: 'admin',
  },
  validate: {
    create: object({
      email: string().required().lowercase(),
      password: string().required(),
    }),
    patch: object({
      email: string().required().lowercase(),
    }),
  },
}, {
  list: true,
  find: true,
  create: true,
  patch: true,
  delete: true,
});

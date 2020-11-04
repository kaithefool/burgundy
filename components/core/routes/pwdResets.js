const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/pwdResets');
const { email, password } = require('../validators');

module.exports = new Routes({
  service,
  validate: {
    create: object({
      email: email().required(),
    }),
    verify: object({
      id: string().required(),
    }),
    reset: object({
      id: string().required(),
      password: password().required(),
    }),
  },
}, {
  create: true,
  verify: {
    method: 'post',
    path: '/verify',
  },
  reset: {
    method: 'post',
    path: '/reset',
  },
});

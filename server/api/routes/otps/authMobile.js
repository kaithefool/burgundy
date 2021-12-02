const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../../services/otps/authMobile');

module.exports = new Routes({
  service,
  validate: {
    create: object({
      mobile: string().required(),
    }),
    verify: object({
      mobile: string().required(),
      verifyKey: string().required(),
    }),
    affirm: object({
      mobile: string().required(),
      verifyKey: string().required(),
    }),
  },
}, {
  create: true,
  verify: {
    method: 'post',
    path: '/verify',
    response: (req, res) => res.end(),
  },
  affirm: { method: 'post', path: '/affirm' },
});

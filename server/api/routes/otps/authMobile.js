const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../../services/otps/authMobile');
const logAccess = require('../../parsers/logAccess');
const authCookies = require('../../helpers/authCookies');

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
  affirm: {
    method: 'post',
    path: '/affirm',
    response: [
      // set user for access log
      (req, res, next) => {
        req.user = res.locals.out.user;

        return next();
      },
      // log
      logAccess('login'),
      // response
      ({ web }, res) => {
        const { locals: { out } } = res;

        if (web) {
          authCookies.set(res, out);

          return res.end();
        }

        return res.json(out);
      },
    ],
  },
});

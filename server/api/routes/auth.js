const { object, string } = require('yup');

const { Routes } = require('../base');
const service = require('../services/auth');
const authCookies = require('../helpers/authCookies');
const { email } = require('../validators');
const logAccess = require('../parsers/logAccess');

module.exports = new Routes({
  service,
  validate: {
    authenticate: object({
      email: email().required(),
      password: string().required(),
    }),
    refresh: object({
      token: string().required(),
    }),
  },
  logs: {
    logout: true,
  },
}, {
  authenticate: {
    method: 'post',
    response: [
      // set user for access log
      (req, res, next) => {
        req.user = res.locals.out.user;

        return next();
      },
      // log
      logAccess('login'),
      // response
      ({ attrs, web }, res) => {
        const { locals: { out } } = res;

        if (web) {
          authCookies.set(res, out, attrs);

          return res.end();
        }

        return res.json(out);
      },
    ],
  },

  refresh: {
    method: 'post',
    path: '/refresh',
  },

  logout: {
    path: '/logout',
    response({ attrs, web }, res) {
      if (web) {
        authCookies.clear(res);
      }
      if (attrs.redirect) {
        return res.redirect('/');
      }

      return res.end();
    },
  },
});

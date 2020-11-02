const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/auth');
const authCookies = require('../helpers/authCookies');

module.exports = new Routes({
  service,
  validate: {
    authenticate: object({
      email: string()
        .trim()
        .lowercase()
        .email()
        .required(),
      password: string().required(),
    }),
  },
}, {
  authenticate: {
    method: 'post',
    response({ attrs }, res) {
      const { locals: { out } } = res;

      if (attrs.web) {
        authCookies.set(res, out, attrs);

        return res.json(out.app);
      }

      return res.json(out);
    },
  },

  logout: {
    path: '/logout',
    response({ attrs }, res) {
      if (attrs.web) {
        authCookies.clear(res);
      }
      if (attrs.redirect) {
        return res.redirect('/');
      }

      return res.end();
    },
  },
});

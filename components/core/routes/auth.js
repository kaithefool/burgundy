const { object } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/auth');
const authCookies = require('../helpers/authCookies');
const { email, password } = require('../validators');

module.exports = new Routes({
  service,
  validate: {
    authenticate: object({
      email: email().required(),
      password: password().required(),
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

const authService = require('../services/auth');
const authCookies = require('../helpers/authCookies');
const csrf = require('./csrf');

module.exports = async function authByCookies(req, res, next) {
  const { access, refresh } = authCookies.get(req);

  // set auth source
  req.web = true;

  if (access || refresh) {
    const output = await authService.verifyOrRenew({ access, refresh });

    if (output) {
      req.user = output.user;

      if (output.access) {
        authCookies.set(res, output);
      }
    } else {
      authCookies.clear(res);
    }
  }

  return csrf(req, res, next);
};

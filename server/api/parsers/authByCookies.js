const authService = require('../services/auth');
const authCookies = require('../helpers/authCookies');
const csrf = require('./csrf');

module.exports = async function authByCookies(req, res, next) {
  // set auth source
  req.web = true;

  try {
    const output = await authService.verifyOrRenew(
      authCookies.get(req),
    );

    if (output.user) req.user = output.user;
    if (output.access) authCookies.set(res, output);
  } catch (e) {
    authCookies.clear(res);
  }

  return csrf(req, res, next);
};

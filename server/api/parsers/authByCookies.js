const csurf = require('csurf');
const httpError = require('http-errors');

const authService = require('../services/auth');
const authCookies = require('../helpers/authCookies');

const {
  HTTPS,
} = process.env;

const csrf = csurf({
  cookie: {
    secure: HTTPS === '1',
    httpOnly: true,
    sameSite: 'strict',
  },
});

module.exports = async function authByCookies(req, res, next) {
  const { access, refresh } = authCookies.get(req);
  let user;

  // set auth source
  req.web = true;

  // check access token first
  if (access) {
    try {
      user = authService.verifyToken(access);
    } catch (e) {
      user = null;
    }
  }

  if (user) {
    req.user = user;
  } else if (refresh) {
    // renew tokens
    try {
      const output = await authService.renewTokens(refresh);
      const { user: u } = output;

      // replace token cookies
      authCookies.set(res, output);

      // set user
      req.user = u;
    } catch (e) {
      authCookies.clear(res);
    }
  }

  // csrf protection
  return csrf(
    req,
    res,
    (err) => {
      if (!err) return next();
      if (err.code !== 'EBADCSRFTOKEN') return next(err);

      return next(httpError(400, 'auth.invalidCsrf'));
    },
  );
};

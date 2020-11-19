const csurf = require('csurf');
const httpError = require('http-errors');

const authService = require('./services/auth');
const authCookies = require('./helpers/authCookies');
const { https } = require('../../start/env');

const csrf = csurf({
  cookie: {
    secure: https,
    httpOnly: true,
    sameSite: 'strict',
  },
});

function authByHeader(req, res, next) {
  const header = req.header('Authorization');

  if (!header) return next();

  const match = header.match(/^Bearer (.*?)$/);

  if (!match || !match[1]) return next();

  try {
    req.user = authService.verifyToken(match[1]);
  } catch (e) {
    return next(httpError(400, 'auth.invalidToken'));
  }

  return next();
}

async function authByCookies(req, res, next) {
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
}

module.exports = {
  authByHeader,
  authByCookies,
};

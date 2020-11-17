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
  const match = req.header('Authorization').match(/^Bearer (.*?)$/);

  if (match && match[1]) {
    const user = authService.verifyToken(match[1]);

    if (user) req.user = user;
  }

  return next();
}

async function authByCookies(req, res, next) {
  const { access, refresh } = authCookies.get(req);
  let user;

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

async function auth(req, res, next) {
  const useHeader = Boolean(req.header('Authorization'));

  if (useHeader) {
    return authByHeader(req, res, next);
  }

  return authByCookies(req, res, next);
}

module.exports = {
  auth,
  authByHeader,
  authByCookies,
};

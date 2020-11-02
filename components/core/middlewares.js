const authService = require('./services/auth');
const authCookies = require('./helpers/authCookies');

function authByHeader(req, res, next) {
  const { header } = req;

  const [, accessTk] = header('Authorization')
    .match(/^Bearer (.*?)$/);

  const user = authService.verify(accessTk);

  if (user) req.user = user;

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

  return next();
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

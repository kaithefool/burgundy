const httpError = require('http-errors');

const io = require('../start/io');
const authCookies = require('../api/helpers/authCookies');
const authServ = require('../api/services/auth');

const authByHeader = (req) => {
  const { authorization: header } = req.headers;

  if (!header) return null;

  const match = header.match(/^Bearer (.*?)$/);

  if (!match || !match[1]) return null;

  try {
    return authServ.verifyToken(match[1]);
  } catch (error) {
    throw httpError(400, 'res.invalidToken');
  }
};

const authByCookies = async (req) => {
  try {
    const output = await authServ.verifyOrRenew(
      authCookies.get(req),
    );

    if (output.access) authCookies.set(req.res, output);
    return output.user;
  } catch (error) {
    authCookies.clear(req.res);
  }

  return null;
};

io.allowRequest(async (req, cb) => {
  req.user = authByHeader(req) || await authByCookies(req);

  console.log(req.user);

  return cb(null, true);
});

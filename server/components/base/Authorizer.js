const httpError = require('http-errors');
const { castArray } = require('lodash');

module.exports = (roles) => (req, res, next) => {
  const rr = castArray(roles);
  const { role = 'guest' } = req.user || {};

  if (!rr.includes('guest') && role === 'guest') {
    return next(httpError(401, 'unauthorized'));
  }
  if (!rr.includes(role)) {
    return next(httpError(403, 'forbidden'));
  }

  return next();
};

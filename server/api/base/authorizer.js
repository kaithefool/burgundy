const httpError = require('http-errors');
const _ = require('lodash');

module.exports = (roles) => (req, res, next) => {
  const rr = _.castArray(roles);
  const { role = 'guest' } = req.user || {};

  if (!rr.includes('guest') && role === 'guest') {
    return next(httpError(401, 'unauthorized'));
  }
  if (!rr.includes(role)) {
    return next(httpError(403, 'forbidden'));
  }

  return next();
};

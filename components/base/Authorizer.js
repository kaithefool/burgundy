const createError = require('http-errors');
const { castArray } = require('lodash');

module.exports = (roles) => (req, res, next) => {
  const rr = castArray(roles);
  const { role = 'guest' } = req.user || {};

  if (!rr.includes('guest') && role === 'guest') {
    throw createError(401, 'unauthorized');
  }
  if (!rr.includes(role)) {
    throw createError(403, 'forbidden');
  }

  return next();
};

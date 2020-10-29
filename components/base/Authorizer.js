const createError = require('http-errors');
const { castArray, intersection } = require('lodash');

module.exports = (roles) => (req, res, next) => {
  const rr = castArray(roles);

  if (!rr.includes('guest') && !req.user) {
    throw createError(401, 'unauthorized');
  }
  if (!intersection(roles, req.user.roles).length) {
    throw createError(403, 'forbidden');
  }

  return next();
};

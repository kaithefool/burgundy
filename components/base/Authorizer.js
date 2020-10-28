const { castArray, intersection } = require('lodash');

module.exports = (roles) => (req, res, next) => {
  const rr = castArray(roles);

  if (!rr.includes('guest') && !req.user) {
    const e = new Error('unauthorized');

    e.status = 401;
    throw e;
  }
  if (!intersection(roles, req.user.roles).length) {
    const e = new Error('forbidden');

    e.status = 403;
    throw e;
  }

  return next();
};

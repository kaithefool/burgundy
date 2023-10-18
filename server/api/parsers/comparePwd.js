const _ = require('lodash');
const httpError = require('http-errors');

const userModel = require('../models/users');

module.exports = ({
  field = 'password',
} = {}) => async ({ user, attrs }, res, next) => {
  if (!user) return next(httpError(401, 'unauthorized'));

  const u = await userModel.findOne({ _id: user._id }, '+password');
  const password = _.get(attrs, field);

  if (!u || !u.active) {
    return next(httpError(400, 'res.userInactivated'));
  }
  if (!(await userModel.comparePwd(password, u.password))) {
    return next(httpError(400, 'res.invalidCredentials'));
  }

  return next();
};

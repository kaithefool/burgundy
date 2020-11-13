const { castArray } = require('lodash');
const createError = require('http-errors');

module.exports = (rules) => async (req, res, next) => {
  try {
    const [schema, opts = {}] = castArray(rules);

    req.attrs = await schema.validate(req.attrs, opts);
  } catch (e) {
    throw createError(400, e);
  }

  return next();
};

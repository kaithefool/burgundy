const { castArray } = require('lodash');
const httpError = require('http-errors');

module.exports = (rules) => async (req, res, next) => {
  try {
    const [schema, opts = {}] = castArray(rules);

    req.attrs = await schema.validate(req.attrs, opts);
  } catch (e) {
    return next(httpError(400, e));
  }

  return next();
};

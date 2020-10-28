const { castArray } = require('lodash');

module.exports = (rules) => async (req, res, next) => {
  try {
    const [schema, opts = {}] = castArray(rules);

    req.attrs = await schema.validate(req.attrs, opts);
  } catch (e) {
    e.status = 400;
    throw e;
  }

  return next();
};

const { merge } = require('lodash');

const defaults = require('../.env.default');
const env = require('../shared/.env');

Object.assign(
  process.env,
  merge({}, defaults, env),
);

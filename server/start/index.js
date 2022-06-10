const env = require('./env');

const db = require('./db');
const redis = require('./redis');
const i18n = require('./i18n');
const socketIO = require('./socketIO');

module.exports = {
  db,
  env,
  redis,
  i18n,
  socketIO,
};

const env = require('./env');

const db = require('./db');
const redis = require('./redis');
const i18n = require('./i18n');
const sockets = require('./sockets');

sockets.use((socket, next) => {
  console.log(socket);

  return next();
});

module.exports = {
  db,
  env,
  redis,
  i18n,
  sockets,
};

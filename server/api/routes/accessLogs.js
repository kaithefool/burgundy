const { Routes } = require('../base');
const service = require('../services/accessLogs');

module.exports = new Routes({
  service,
  authorize: 'admin',
  validate: {},
}, {
  list: true,
  find: true,
  delete: true,
});

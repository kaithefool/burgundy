const { Routes } = require('../base');
const service = require('../services/views');

module.exports = new Routes({
  service,
  authorize: 'admin',
  validate: {},
}, {
  list: true,
  find: true,
  create: true,
  patch: true,
  delete: true,
});

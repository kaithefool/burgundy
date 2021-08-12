const { Routes } = require('../base');
const service = require('../core/services/files');

module.exports = new Routes({
  service,
  authorize: 'admin',
}, {
  list: true,
  find: true,
  create: true,
  patch: true,
  delete: true,
});

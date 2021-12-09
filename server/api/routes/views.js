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
  patchActive: {
    path: '/active/:_id?',
    method: 'patch',
  },
  delete: true,
});

const { Routes } = require('../base');
const service = require('../services/views');

const { findOne } = Routes.namedRoutes;

module.exports = new Routes({
  service,
  authorize: {
    list: 'admin',
    find: 'admin',
    create: 'admin',
    patch: 'admin',
    patchActive: 'admin',
    delete: 'admin',
  },
  validate: {},
}, {
  list: true,
  find: true,
  findOne: {
    ...findOne,
    path: '/u',
  },
  create: true,
  patch: true,
  patchActive: {
    path: '/active/:_id?',
    method: 'patch',
  },
  delete: true,
});

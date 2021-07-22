---
to: server/components/<%= ns %>/routes/<%= file %>.js
---
const { Routes } = require('../../base');
const service = require('../services/<%= file %>');

module.exports = new Routes({
  service,
  authorize: {},
  validate: {},
}, {
  list: true,
  find: true,
  create: true,
  patch: true,
  delete: true,
});

---
to: server/api/routes/<%= n.plural.camel %>.js
---
const { Routes } = require('../base');
const service = require('../services/<%= n.plural.camel %>');

module.exports = new Routes({
  service,
  authorize: 'admin',
  validate: {},
}, {
<% if (singleton) { %>
  findOne: {},
  upsert: true,
<% } else { %>
  list: true,
  findById: true,
  create: true,
  patch: true,
  delete: true,
<% } %>
});

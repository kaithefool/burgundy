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
<% if (typeof singleton !== 'undefined' && singleton) { %>
  find: {},
  upsert: true,
<% } else { %>
  list: true,
  find: true,
  create: true,
  patch: true,
  delete: true,
<% } %>
});

---
to: server/components/<%= ns %>/routes/index.js
unless_exists: true
---
const routes = require('express').Router();

const <%= n.plural.camel %> = require('./<%= n.plural.camel %>');

routes.use('/<%= n.plural.path %>', <%= n.plural.camel %>);

module.exports = routes;

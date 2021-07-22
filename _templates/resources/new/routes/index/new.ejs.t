---
to: server/components/<%= ns %>/routes/index.js
unless_exists: true
---
const routes = require('express').Router();

const <%= file %> = require('./<%= file %>');

routes.use('/<%= tbl %>', <%= file %>);

module.exports = routes;

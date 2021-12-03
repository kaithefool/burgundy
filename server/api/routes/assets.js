const path = require('path');
const express = require('express');
const authorizer = require('../base/authorizer');

const routes = express.Router();

routes.use(
  authorizer('admin'), // only admins can access the files
  express.static(path.join(__dirname, '../assets')),
);

module.exports = routes;

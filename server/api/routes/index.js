const path = require('path');
const express = require('express');

const routes = express.Router();

const otps = require('./otps');
const accessLogs = require('./accessLogs');
const auth = require('./auth');
const files = require('./files');
const users = require('./users');

routes.use('/otps', otps);
routes.use('/access-logs', accessLogs);
routes.use('/auth', auth);
routes.use('/files', files);
routes.use('/users', users);

routes.use(
  '/assets',
  express.static(path.join(__dirname, '../assets')),
);

module.exports = routes;

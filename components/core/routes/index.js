const routes = require('express').Router();

const auth = require('./auth');
const files = require('./files');
const i18n = require('./i18n');
const pwdResets = require('./pwdResets');
const users = require('./users');

routes.use('auth', auth);
routes.use('files', files);
routes.use('i18n', i18n);
routes.use('pwd-resets', pwdResets);
routes.use('users', users);

module.exports = routes;

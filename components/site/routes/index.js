const routes = require('express').Router();

const i18n = require('./i18n');

routes.use('/i18n', i18n);

module.exports = routes;

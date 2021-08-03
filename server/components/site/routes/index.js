const routes = require('express').Router();

const i18ns = require('./i18ns');

routes.use('/i18ns', i18ns);

module.exports = routes;

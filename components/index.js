const Router = require('express');

const {
  routes: core,
  middlewares: { authByHeader, authByCookies },
} = require('./core');
const { routes: site } = require('./site');

const api = Router();
const components = Router();

components.use('/core', core);
components.use('/site', site);

api.use('/a', authByHeader, components);
api.use('/', authByCookies, components);

module.exports = api;

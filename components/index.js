const Router = require('express');

const {
  routes: core,
  middlewares: { authByHeader, authByCookies },
} = require('./core');

const api = Router();
const components = Router();

components.use('/core', core);

api.use('/a', authByHeader, components);
api.use('/', authByCookies, components);

module.exports = api;

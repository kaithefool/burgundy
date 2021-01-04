const Router = require('express');
const httpError = require('http-errors');

const {
  routes: core,
  middlewares: { authByHeader, authByCookies },
} = require('./core');
const { routes: site } = require('./site');

const api = Router();
const components = Router();

components.use('/core', core);
components.use('/site', site);

// catch 404 and forward to error handler
components.use((req, res, next) => next(httpError(404)));

api.use((req, res, next) => {
  res.isApi = true;

  return next();
});
api.use('/a', authByHeader, components);
api.use('/', authByCookies, components);

module.exports = api;

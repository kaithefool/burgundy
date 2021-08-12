const Router = require('express');
const httpError = require('http-errors');

const {
  authByHeader,
  authByCookies,
} = require('./middlewares');

const components = require('./routes');

const api = Router();

// catch 404 and forward to error handler
components.use((req, res, next) => next(httpError(404)));

api.use((req, res, next) => {
  res.isApi = true;

  return next();
});
api.use('/a', authByHeader, components);
api.use('/', authByCookies, components);

module.exports = api;

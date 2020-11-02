const routes = require('express').Router();

const {
  routes: core,
  middlewares: { auth },
} = require('./core');

routes.use(auth);

routes.use('/core', core);

module.exports = routes;

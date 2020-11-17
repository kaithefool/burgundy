const routes = require('express').Router();

const {
  middlewares: { auth },
} = require('../components/core');

// authentication middleware
routes.use(auth);

routes.use(({ csrfToken }, res, next) => {
  res.local.env = {
    csrf: csrfToken ? csrfToken() : null,
  };

  return next();
});

module.exports = routes;

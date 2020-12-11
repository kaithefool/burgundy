const routes = require('express').Router();

const {
  middlewares: { authByCookies },
} = require('../components/core');

// authentication middleware
routes.use(authByCookies);

// env variables for frontend
routes.use(({ csrfToken }, res, next) => {
  res.locals.env = {
    csrf: csrfToken ? csrfToken() : null,
  };

  return next();
});

routes.use(
  ['/auth', '/auth/*'],
  (req, res) => res.render('auth'),
);

module.exports = routes;

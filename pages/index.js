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
  ({ user }, res) => {
    if (user) {
      if (user.role === 'admin') return res.redirect('/admin');
    }

    return res.render('auth');
  },
);
routes.use(
  ['/admin', '/admin/*'],
  ({ user }, res) => {
    if (!user || user.role !== 'admin') return res.redirect('/auth');

    return res.render('admin');
  },
);

module.exports = routes;

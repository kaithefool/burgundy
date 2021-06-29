const routes = require('express').Router();
const {
  version: assetsVer,
} = require('../../assets/package.json');

const {
  middlewares: { authByCookies },
} = require('../components/core');

// authentication middleware
routes.use(authByCookies);

// env variables for frontend
routes.use(({ csrfToken }, res, next) => {
  res.locals.assetsVer = assetsVer;
  res.locals.env = {
    csrf: csrfToken ? csrfToken() : null,
  };

  return next();
});

routes.get('/logout', (req, res) => (
  res.redirect('/api/core/auth/logout?web=1&redirect=1')
));

routes.use(
  ['/admin', '/admin/*'],
  ({ user }, res) => {
    if (!user || user.role !== 'admin') return res.redirect('/auth');

    return res.render('admin');
  },
);

routes.use(
  '/',
  ({ user }, res) => {
    if (user) {
      if (user.role === 'admin') return res.redirect('/admin');
    }

    return res.render('app');
  },
);

module.exports = routes;

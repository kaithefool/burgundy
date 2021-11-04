const routes = require('express').Router();

const authByCookies = require('../api/parsers/authByCookies');
const {
  version: ver,
} = require('../../package.json');

const { LANG, LANG_LABEL } = process.env;

// authentication middleware
routes.use(authByCookies);

// env variables for frontend
routes.use(({ csrfToken }, res, next) => {
  res.locals.ver = ver;
  res.locals.env = {
    csrf: csrfToken ? csrfToken() : null,
    lngs: LANG.split(','),
    lngLabels: LANG_LABEL.split(','),
  };

  return next();
});

routes.get('/logout', (req, res) => (
  res.redirect('/api/auth/logout?web=1&redirect=1')
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

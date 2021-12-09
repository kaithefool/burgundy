const routes = require('express').Router();

const authByCookies = require('../api/parsers/authByCookies');
const consts = require('../api/models/consts');

const {
  version: ver,
} = require('../../package.json');

const { LNG, LNG_LABEL } = process.env;

// authentication middleware
routes.use(authByCookies);

// env variables for frontend
routes.use(({ csrfToken }, res, next) => {
  res.locals.ver = ver;
  res.locals.env = {
    csrf: csrfToken ? csrfToken() : null,
    lngs: LNG.split(','),
    lngLabels: LNG_LABEL.split(','),
    ...consts.public,
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

routes.get('/', (req, res) => res.redirect('/auth'));

routes.use(
  '/',
  ({ user }, res) => {
    if (user) {
      // if (user.role === 'admin') return res.redirect('/admin');
    }

    return res.render('app');
  },
);

module.exports = routes;

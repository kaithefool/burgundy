const routes = require('express').Router();

const authByCookies = require('../api/parsers/authByCookies');
const consts = require('../api/models/consts');
const redirectCookies = require('../api/helpers/redirectCookies');

const {
  version: ver,
} = require('../../package.json');

const { LNG, LNG_LABEL, GOOGLE_API_KEY } = process.env;

// authentication middleware
routes.use(authByCookies);

// env variables for frontend
routes.use(({ csrfToken, user }, res, next) => {
  res.locals.ver = ver;
  res.locals.env = {
    user,
    csrf: csrfToken ? csrfToken() : null,
    lngs: LNG.split(','),
    lngLabels: LNG_LABEL.split(','),
    googleApiKey: GOOGLE_API_KEY,
    meta: {
      title: 'Burgundy',
    },
    ...consts.public,
  };

  return next();
});

routes.get('/logout', (req, res) => (
  res.redirect('/api/auth/logout?redirect')
));

routes.use(
  ['/admin', '/admin/*'],
  (req, res) => {
    if (req.user?.role !== 'admin') {
      redirectCookies.set(req, res, { base: '/admin' });

      return res.redirect(req.user ? '/logout' : '/auth');
    }

    return res.render('admin');
  },
);

routes.get('/', (req, res) => res.redirect('/auth'));
routes.use(
  '/auth',
  (req, res) => {
    if (req.user?.role === 'admin') {
      return redirectCookies.consume(req, res, { base: '/admin' });
    }

    return res.render('home');
  },
);

routes.use(
  '/',
  (req, res) => res.render('home'),
);

module.exports = routes;

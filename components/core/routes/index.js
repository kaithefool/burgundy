const routes = require('express').Router();

const auth = require('./auth');
const pwdResets = require('./pwdResets');

routes.use('/auth', auth);
routes.use('/pwd-resets', pwdResets);

module.exports = routes;

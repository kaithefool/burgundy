const routes = require('express').Router();
const authMobile = require('./authMobile');
const pwdresetEmail = require('./pwdresetEmail');

routes.use('/auth-mobile', authMobile);
routes.use('/pwdreset-email', pwdresetEmail);

module.exports = routes;

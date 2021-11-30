const routes = require('express').Router();

const smsVerifs = require('./smsVerifs');
const accessLogs = require('./accessLogs');
const auth = require('./auth');
const files = require('./files');
const pwdResets = require('./pwdResets');
const users = require('./users');

routes.use('/sms-verifs', smsVerifs);
routes.use('/access-logs', accessLogs);
routes.use('/auth', auth);
routes.use('/files', files);
routes.use('/pwd-resets', pwdResets);
routes.use('/users', users);

module.exports = routes;

const httpError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errHandler = require('./lib/err/errHandler');
const i18n = require('./start/i18n');
const api = require('./api');
const pages = require('./pages');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'pages/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(i18n);
app.use('/api', api);
app.use('/', pages);

// catch 404 and forward to error handler
app.use((req, res, next) => (
  next(httpError(404, 'res.notFound'))
));

// error handler
app.use(errHandler);

module.exports = app;

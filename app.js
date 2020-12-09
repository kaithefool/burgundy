const httpError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('i18n');

const { env } = require('./start');

const api = require('./components');
const pages = require('./pages');

const app = express();

// locales
i18n.configure({
  locales: ['en', 'zh-hk'],
  defaultLocale: 'en',
  cookie: 'lang',
  directory: path.join(__dirname, env.fileStorage.locales),
});

// view engine setup
app.set('views', path.join(__dirname, 'pages/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'shared/public')));
app.use(i18n.init);

app.use('/api', api);
app.use('/', pages);

// catch 404 and forward to error handler
app.use((req, res, next) => next(httpError(404)));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (status === 500) console.error(err);

  // render the error page
  res.status(status);
  res.render('error');
});

module.exports = app;

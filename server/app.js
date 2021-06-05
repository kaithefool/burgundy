const httpError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const i18n = require('./start/i18n');
const api = require('./components');
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
app.use((req, res, next) => next(httpError(404)));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (status === 500) console.error(err);

  // render the error
  res.status(status);

  if (res.isApi) {
    return res.send(err.message);
  }

  return res.render('error');
});

module.exports = app;

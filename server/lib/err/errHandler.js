const { NODE_ENV } = process.env;

// eslint-disable-next-line no-unused-vars
module.exports = (err, { t }, res, next) => {
  const { status = 500, expose = false } = err;
  let { message, stack } = err;

  // server log
  if (status >= 500) console.error(err);

  // i18n
  message = t(message);

  // only providing error details in development
  if (NODE_ENV === 'production' && !expose) {
    message = '';
    stack = undefined;
  }

  // render the error
  const e = { status, message, stack };

  res.status(status);
  res.locals.error = e;

  if (res.isApi) {
    return res.json(e);
  }

  return res.render('error');
};

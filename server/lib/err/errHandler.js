const _ = require('lodash');

const { NODE_ENV } = process.env;

// eslint-disable-next-line no-unused-vars
module.exports = (err, { t }, res, next) => {
  const {
    status = 500, expose = false, stack, model,
  } = err;
  let { message } = err;

  // server log
  if (status >= 500) console.error(err);

  // i18n
  if (t) {
    const m = [message];

    // model specified message
    if (model) {
      m.unshift(`res.models.${model}.${
        message.replace(/^res\./, '')
      }`);
    }

    message = t(m, {
      ...err,
      ...err.keys && {
        keys: err.keys.map((k) => (
          t(`fields.${k}`, _.lowerCase(k))
        )).join(t('gen.or')),
      },
      ...err.values && {
        values: err.values.join(', '),
      },
    });
  }

  // render the error
  const e = { status, message, stack };

  // only providing error details in development
  if (NODE_ENV === 'production' && !expose) {
    delete e.stack;
  }

  res.status(status);
  res.locals.error = e;

  if (res.isApi) {
    return res.json(e);
  }

  return res.render('error');
};

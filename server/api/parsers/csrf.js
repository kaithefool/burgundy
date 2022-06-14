const csurf = require('csurf');
const httpError = require('http-errors');

const { HTTPS } = process.env;

const csrf = csurf({
  cookie: {
    secure: HTTPS === '1',
    httpOnly: true,
    sameSite: 'strict',
  },
});

module.exports = (req, res, next) => csrf(
  req,
  res,
  (err) => {
    if (!err) return next();
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    return next(httpError(400, 'res.invalidCsrf'));
  },
);

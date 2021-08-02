const path = require('path');
const Email = require('email-templates');

const {
  ROOT,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
  MAIL_DEFAULT_SENDER,
} = process.env;

const transport = {
  pool: true,
  host: MAIL_HOST,
  port: MAIL_PORT || 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
};

const email = new Email({
  transport,
  views: {
    root: path.resolve(__dirname, 'templates'),
    locals: {
      rootUrl: ROOT,
    },
  },
  message: {
    from: MAIL_DEFAULT_SENDER || transport.auth.user,
  },
});

module.exports = email;

const path = require('path');
const Email = require('email-templates');

const { env } = process;

const transport = {
  pool: true,
  host: env.MAIL_HOST,
  port: env.MAIL_PORT || 587,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
};

const email = new Email({
  transport,
  views: {
    root: path.resolve(__dirname, 'templates'),
    locals: {
      rootUrl: env.ROOT,
    },
  },
  message: {
    from: env.MAIL_DEF_SENDER || env.MAIL_USER,
  },
});

module.exports = email;

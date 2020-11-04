const path = require('path');
const Email = require('email-templates');

const {
  root,
  mail: { defSender, ...conn },
} = process.env;

const transport = {
  pool: true,
  ...conn,
};

const email = new Email({
  transport,
  views: {
    root: path.resolve(__dirname, 'templates'),
    locals: {
      rootUrl: root,
    },
  },
  message: {
    from: defSender || conn.auth.user,
  },
});

module.exports = email;

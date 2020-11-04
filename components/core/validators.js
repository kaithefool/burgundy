const { string } = require('yup');

exports.email = () => string()
  .trim()
  .lowercase()
  .email();

exports.password = () => string();

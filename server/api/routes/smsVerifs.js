const { Routes } = require('../base');
const service = require('../services/smsVerifs');

module.exports = new Routes({
  service,
  validate: {},
}, {
  create: true,
});

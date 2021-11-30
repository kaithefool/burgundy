const ms = require('ms');

const Model = require('../base/Model');

const { VERIFY_SMS_TTL } = process.env;

module.exports = new Model('SmsVerif', {
  mobile: { type: String, required: true },
  verifyKey: {
    type: String,
    // random 4 digits string
    default: () => Math.floor(
      Math.random() * (9999 - 1000 + 1),
    ) + 1000,
  },
  createdAt: {
    type: Date,
    expires: ms(VERIFY_SMS_TTL),
    default: Date.now,
  },
}, {
  uniques: { mobile: 1 },
});

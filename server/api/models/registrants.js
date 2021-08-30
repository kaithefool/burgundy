const { nanoid } = require('nanoid');
const ms = require('ms');

const User = require('./User');

const { REGISTER_TTL } = process.env;

module.exports = new User('Registrant', {
  verifyKey: {
    type: String,
    index: true,
    default: nanoid,
  },
  createdAt: {
    type: Date,
    expires: ms(REGISTER_TTL),
    default: Date.now,
  },
}, {
  uniques: { verifyKey: 1 },
});

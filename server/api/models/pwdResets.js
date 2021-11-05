const { nanoid } = require('nanoid');
const ms = require('ms');

const Model = require('../base/Model');

const { Schema } = Model;
const {
  RESET_PWD_KEY_TTL,
} = process.env;

module.exports = new Model('PwdReset', {
  verifyKey: {
    type: String,
    index: true,
    default: nanoid,
  },
  user: Schema.ref('User'),
  createdAt: {
    type: Date,
    expires: ms(RESET_PWD_KEY_TTL),
    default: Date.now,
  },
});

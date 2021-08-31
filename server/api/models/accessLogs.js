const Model = require('../base/Model');

const { Schema } = Model;

const { ACCESSLOG_TTL } = process.env;

module.exports = new Model('AccessLog', {
  action: { type: String, required: true },
  user: Schema.ref('User'),
  ip: String,
  userAgent: String,

  expiresAt: {
    type: Date,
    expires: 1,
    default: Schema.fromNow(ACCESSLOG_TTL),
  },
}, {
  timestamps: {
    updated: false,
    deleted: false,
  },
});

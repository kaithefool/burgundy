const User = require('./User');

const { Schema } = User;

module.exports = new User('User', {
  // authentication
  lastLogin: Date,
  lastLogout: Date,
  resetLocked: Boolean,
  active: { type: Boolean, default: true },

  // additional
  profiles: Schema.files(),
  avatar: Schema.files(),
  cover: Schema.files(),
  intro: String,
}, {
  timestamps: true,
  uniques: { email: 1 },
});

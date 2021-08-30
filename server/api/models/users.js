const User = require('./User');

module.exports = new User('User', {
  // authentication
  lastLogin: Date,
  lastLogout: Date,
  resetLocked: Boolean,
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
  uniques: { email: 1 },
});

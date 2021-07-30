const Model = require('../../base/Model');
const crypto = require('../helpers/crypto');

class User extends Model {
  comparePwd(pwd, hash) {
    return crypto.compare(pwd, hash);
  }

  async setter(values) {
    const v = { ...values };

    if (v.password) {
      v.password = await crypto.encrypt(v.password);
    }

    return v;
  }
}

module.exports = new User('User', {
  // authentication
  lastLogin: Date,
  lastLogout: Date,
  resetLocked: Boolean,
  active: { type: Boolean, default: true },

  // essentials
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
});

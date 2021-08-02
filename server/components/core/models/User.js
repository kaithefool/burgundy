const Model = require('../../base/Model');
const crypto = require('../helpers/crypto');

class User extends Model {
  constructor(name, paths, opts) {
    super(name, {
      // essentials
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        select: false,
      },
      role: {
        type: String,
        enum: ['admin', 'client'],
      },
      ...paths,
    }, opts);
  }

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

module.exports = User;

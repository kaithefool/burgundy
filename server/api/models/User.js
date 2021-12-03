const Model = require('../base/Model');
const crypto = require('../helpers/crypto');

const { Schema } = Model;

class User extends Model {
  constructor(name, paths, opts) {
    super(name, {
      // essentials
      email: String,
      mobile: String,
      password: {
        type: String,
        select: false,
      },
      role: {
        type: String,
        enum: ['admin', 'client'],
        required: true,
      },

      // additional
      name: {
        type: Schema.lang(String),
        default: undefined,
      },

      // extends
      ...paths,
    }, {
      ...opts,
      toJSON: {
        virtuals: true,
        transform: ({
          _doc: { password, ...v },
        }) => v,
      },
    });
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

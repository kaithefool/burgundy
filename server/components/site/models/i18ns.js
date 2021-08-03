const { set } = require('lodash');

const Model = require('../../base/Model');

const { LANG } = process.env;

class I18n extends Model {
  toObj(rows) {
    const output = {};

    rows.forEach((t) => {
      set(output, t.path, t.translation);
    });

    return output;
  }
}

module.exports = new I18n('I18n', {
  path: { type: String, required: true },
  lang: {
    type: String,
    required: true,
    enum: LANG.split(','),
  },
  translation: String,
}, {
  timestamps: true,

});

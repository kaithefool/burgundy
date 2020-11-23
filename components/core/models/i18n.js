const { set } = require('lodash');

const Model = require('../../base/Model');

class I18n extends Model {
  toObj(rows) {
    const output = {};

    rows.forEach((t) => {
      set(output, t.path, t.translation);
    });

    return output;
  }
}

module.exports = new I18n('i18n', { id: false });

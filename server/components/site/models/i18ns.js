const Model = require('../../base/Model');

const { LANG } = process.env;

module.exports = new Model('I18n', {
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

const Model = require('../base/Model');

module.exports = new Model('File', {
  path: { type: String, required: true },
  originalname: String,
  mimetype: { type: String, required: true },
  size: { type: String, required: true },
}, {
  timestamps: true,
});

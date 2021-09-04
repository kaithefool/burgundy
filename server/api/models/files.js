const Model = require('../base/Model');

module.exports = new Model('File', {
  path: { type: String, required: true },
  originalname: String,
  type: { type: String, required: true },
  size: { type: String, required: true },
}, {
  timestamps: true,
  uniques: [{ path: 1 }],
});

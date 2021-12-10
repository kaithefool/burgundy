const Model = require('../base/Model');

const { Schema } = Model;

const views = new Model('View', {
  url: String,
  active: { type: Boolean, default: true },

  title: Schema.lng(String),
  body: Schema.lng(String),
}, {
  timestamps: true,
});

views.seeds([
  { url: '/terms' },
]);

module.exports = views;

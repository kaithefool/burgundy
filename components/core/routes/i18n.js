const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/i18n');

const schema = object({
  locale: string().max(10).required(),
  path: string().max(200).required(),
  translation: string().max(5000).required(),
});

module.exports = new Routes({
  service,
  authorize: 'admin',
  validate: {
    upsert: schema,
  },
}, {
  list: true,
  upsert: {
    method: 'put',
  },
  delete: true,
});

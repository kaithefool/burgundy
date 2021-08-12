const { object, string } = require('yup');

const { Routes } = require('../base');
const service = require('../site/services/i18ns');

const schema = object({
  lang: string().max(10).required(),
  ns: string().max(25).required(),
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

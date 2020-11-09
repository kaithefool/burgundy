const { set } = require('lodash');
const { object, string } = require('yup');

const { Routes } = require('../../base');
const service = require('../services/auth');

const schema = object({
  locale: string().max(10).required(),
  path: string().max(200).required(),
  translation: string().max(5000).required(),
});

module.exports = new Routes({
  service,
  authorize: {
    list: 'admin',
    create: 'admin',
    patch: 'admin',
    delete: 'admin',
  },
  validate: {
    create: schema,
    patch: schema,
  },
}, {
  find: {
    path: '/:locale',
    response: (req, res) => {
      const { out } = res.locals;
      const o = {};

      out.forEach((t) => {
        set(o, t.path, t.translation);
      });

      return res.json(o);
    },
  },
  list: true,
  create: true,
  patch: true,
  delete: true,
});

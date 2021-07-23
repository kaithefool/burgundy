const s = require('inflection');
const c = require('change-case');

module.exports = {
  params: ({ args }) => {
    const { name } = args;
    const [ns, tbl] = name.split('/');
    const model = s.singularize(c.pascal(tbl));
    const file = c.camel(tbl);

    return {
      ...args,
      ns,
      tbl,
      model,
      file,
    };
  },
};
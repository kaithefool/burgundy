const s = require('inflection');
const c = require('change-case');

module.exports = ({ args }) => {
  const { name } = args;
  const [ns, resource] = name.split('/');
  
  const singular = s.singularize(resource);
  const plural = resource;
  const n = {
    singular: {
      snake: c.snake(singular),
      pascal: c.pascal(singular),
      camel: c.camel(singular),
      path: c.path(singular),
      title: c.title(singular),
    },
    plural: {
      snake: c.snake(plural),
      pascal: c.pascal(plural),
      camel: c.camel(plural),
      path: c.path(plural),
      title: c.title(plural),
    },
  };

  return {
    ...args,
    ns,
    n,
  };
};
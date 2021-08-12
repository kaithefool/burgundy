const s = require('inflection');
const c = require('change-case');

module.exports = ({ args }) => {
  const { name } = args;
  
  const singular = s.singularize(name);
  const plural = name;
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
    n,
  };
};
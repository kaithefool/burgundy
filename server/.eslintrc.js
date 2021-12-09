module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // enable development in windows
    'linebreak-style': 'off',

    // methods that could use 'this' when overwritten
    'class-methods-use-this': 'off',

    // leaving room to expand more exports
    'import/prefer-default-export': 'warn',

    // mongodb
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};

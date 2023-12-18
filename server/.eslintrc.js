module.exports = {
  env: {
    node: true,
  },
  plugins: ['jsdoc'],
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'max-len': ['warn', { code: 80, ignoreRegExpLiterals: true }],
    'jsdoc/no-undefined-types': 1,

    // enable development in windows
    'linebreak-style': 'off',

    // methods that could use 'this' when overwritten
    'class-methods-use-this': 'off',

    // leaving room to expand more exports
    'import/prefer-default-export': 'warn',

    // for headers
    'no-param-reassign': ['error', { props: false }],

    // mongodb
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};

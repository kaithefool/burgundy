const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', path.resolve(__dirname, './src/js')],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      version: '16.13',
    },
  },
  rules: {
    // enable development in windows
    'linebreak-style': 'off',
    // enable dev without node_modules
    // for docker containers
    'import/no-unresolved': 'off',
    // misc
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
  },
};

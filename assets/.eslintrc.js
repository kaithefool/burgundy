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

    // methods that could use 'this' when overwritten
    'class-methods-use-this': 'off',

    // leaving room to expand more exports
    'import/prefer-default-export': 'warn',

    // mongodb
    'no-underscore-dangle': ['error', { allow: ['_id'] }],

    // no type checking
    'react/prop-types': 'off',

    // hoc components
    'react/jsx-props-no-spreading': 'off',

    // it's okay to use index if the array is constant
    'react/no-array-index-key': 'off',

    // ARIA: TBC...
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
  },
};

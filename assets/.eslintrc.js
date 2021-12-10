const path = require('path');

module.exports = {
  parser: '@babel/eslint-parser',
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
    babelOptions: {
      configFile: './assets/.babelrc',
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

    // methods that could use 'this' when overwritten
    'class-methods-use-this': 'off',

    // leaving room to expand more exports
    'import/prefer-default-export': 'warn',

    // for DOM and Web API
    'no-param-reassign': ['error', { props: false }],

    // mongodb
    'no-underscore-dangle': ['error', { allow: ['_id'] }],

    // no type checking
    'react/prop-types': 'off',

    // hoc components
    'react/jsx-props-no-spreading': 'off',

    // it's okay to use index if the array is constant
    'react/no-array-index-key': 'off',

    // resolve 'function-declaration' and 'unnamed function' conflict
    // what a joke
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],

    // TBC... too much work for little performance gain?
    'react/jsx-no-constructed-context-values': 'off',

    // ARIA: TBC...
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};

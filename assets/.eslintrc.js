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
    react: {
      version: '16.13',
    },
  },
  rules: {
    // enable development in windows
    'linebreak-style': 'off',
    // enable dev without node_modules
    // for docker
    'import/no-unresolved': 'off',
    // misc
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
  },
};

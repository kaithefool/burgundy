module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    // enable development in windows
    'linebreak-style': 'off',
    // misc
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};

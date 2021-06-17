module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    // enable dev in windows
    'linebreak-style': 'off',
    // misc
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    // enable dev without node_modules
    // for docker containers
    'import/no-unresolved': 'off',
  },
};

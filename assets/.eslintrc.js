module.exports = {
  parser: "babel-eslint",
  "env": {
    "browser": true,
  },
  "plugins": ['react', 'react-hooks'],
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "settings": {
    "import/resolver": "webpack",
  },
  "rules": {
    // enable development in windows
    "linebreak-style": "off",
    // for mongodb
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "react/prop-types": "off"
  },
}

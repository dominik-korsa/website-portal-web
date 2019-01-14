// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    //  "chrome": true
    chrome: true
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  rules: {
    "import/no-dynamic-require": 'off',
    "global-require": 'off',
    "consistent-return": 'off',
    "no-console": 'off',
    "no-plusplus": 'off',
    "no-shadow": 'warn'
  }
}

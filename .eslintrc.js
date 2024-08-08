module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  parser: 'vue-eslint-parser',
  rules: {
    'no-new-func': 'off',
    'space-before-function-paren':'off',
    'comma-dangle': 'off',
  },
  extends: [
    'standard'
  ],
  env: {
    browser: true
  }
}
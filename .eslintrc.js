module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    'object-curly-spacing': 'off',
  },
};

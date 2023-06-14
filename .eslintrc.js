module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "standard",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["off"],
    "no-console": "error",
    semi: "off",
    "comma-dangle": "off",
    "space-before-function-paren": "off",
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'linebreak-style': 0,
    // 'no-plusplus': 0,
    // 'no-fallthrough': 0,
    'import/no-cycle': 0,
    'arrow-parens': 0,
    'default-case': 0,
    'no-explicit-any': 0,
    'no-alert': 0,
    '@typescript-eslint/no-explicit-any': 0,
    // 'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    '@typescript-eslint/no-empty-function': 0
  },
};

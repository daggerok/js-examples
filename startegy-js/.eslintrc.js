module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    indent: [
      'warn',
      2,
    ],
    'linebreak-style': [
      'warn',
      'unix',
    ],
    quotes: [
      'warn',
      'single',
    ],
    semi: [
      'warn',
      'always',
    ],
  },
};

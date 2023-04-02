module.exports = {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  printWidth: 140,
  proseWrap: 'never',
  arrowParens: 'avoid',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
}

module.exports = {
  'printWidth': 90,
  'tabWidth': 2,
  'useTabs': false,
  'singleQuote': true,
  'semi': true,
  'quoteProps': 'preserve',
  'trailingComma': 'es5',
  'overrides': [
    {
      'files': '*.json',
      'options': {
        'parser': 'json',
      },
    },
  ],
};

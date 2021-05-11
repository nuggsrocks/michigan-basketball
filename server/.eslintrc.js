module.exports = {
  'env': {
    'node': true,
    'es2021': true,
    'jest': true,
  },
  'extends': [
    'eslint:recommended',
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'ignorePatterns': ['**/node_modules/*'],
  'rules': {
    'max-len': [
      2,
      100,
      {
        'ignoreUrls': true,
        'ignoreComments': true,
      },
    ],
  },
};

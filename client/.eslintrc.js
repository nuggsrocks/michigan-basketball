module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
  },
  'extends': [
      'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'ignorePatterns': ['**/node_modules/*', 'public/*'],
  'plugins': [
    'react',
  ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'rules': {
    'max-len': [
      2,
      {
        'ignoreUrls': true,
        'ignoreComments': true,
      },
    ],
  },
};

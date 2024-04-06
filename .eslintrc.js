module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    curly: ['error'],

    'no-irregular-whitespace': 'off',
    'no-empty-patterns': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  root: true,
};

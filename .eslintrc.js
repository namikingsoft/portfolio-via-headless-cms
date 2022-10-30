module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // needless adove react v17
    'react/react-in-jsx-scope': 'off',
    // use @typescript-eslint
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    // other
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'always-multiline'],
  },
}

import { FlatCompat } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: _import,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        module: 'readonly',
      },
      parser: tsParser,
    },
    rules: {
      quotes: ['error', 'double', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-console': 'off',
      'import/prefer-default-export': 'off',
      'lines-between-class-members': 'off',
      'no-use-before-define': 'off',
      'import/extensions': 'off',
      'no-undef': 'off',
      'import/no-default-export': 'error',
    },
  },
];
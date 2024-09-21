import js from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  js.configs.recommended,
  tjwBase,
  ...compat.extends('eslint-config-tjw-jsdoc'),
  {
    rules: {
      'jsdoc/require-file-overview': 'off',
      'jsdoc/check-examples': 'off',
      'jsdoc/require-example': 'off',
      'jsdoc/no-defaults': 'off'
    }
  }
];

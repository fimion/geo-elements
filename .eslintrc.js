'use strict';

/**
 * @file    Manages the ESLint rules
 * @author  Fimion
 */

module.exports = {
  extends: [
    'tjw-base',
    'tjw-import',
    'tjw-jsdoc'
  ],
  globals: {
    Promise: true,
    Proxy: true,
    Reflect: true
  },
  rules: {
    'jsdoc/check-examples': 'off',
    'jsdoc/require-example': 'off'
  }
};

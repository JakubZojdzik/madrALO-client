/* eslint-disable import/no-extraneous-dependencies */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['airbnb-base', 'plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
    rules: {
        indent: ['error', 4],
        'no-console': 0,
        'max-len': ['error', { code: 170 }],
        'no-param-reassign': ['error', { 'props': false }],
        'no-alert': 'off',
        'no-restricted-globals': 'off',
    },
    parserOptions: {
        ecmaVersion: 'latest'
    }
};

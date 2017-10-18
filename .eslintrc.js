// http://eslint.org/docs/user-guide/configuring
// https://stackoverflow.com/questions/41735890/how-to-make-webstorm-format-code-according-to-eslint
module.exports = {
  extends: [
    // https://github.com/AlloyTeam/eslint-config-alloy/blob/master/index.js
    // https://github.com/AlloyTeam/eslint-config-alloy/blob/master/vue.js
    'eslint-config-alloy/vue',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true
    },
    parser: 'babel-eslint',
    allowImportExportEverywhere: true,
    codeFrame: false
  },
  rules: {
    /**
     * this ref to editorconfig
     */
    // https://eslint.org/docs/rules/eol-last
    'eol-last': ['error', 'always'],
    // indent bug in <script> https://github.com/vuejs/eslint-plugin-vue/issues/118
    'indent': 'off',
    'indent-legacy': ['error', 2],
    // https://eslint.org/docs/rules/linebreak-style
    'linebreak-style': ['error', 'unix'],
    // https://eslint.org/docs/rules/unicode-bom
    'unicode-bom': ['error', 'never'],

    /**
     * this are link style
     */
    // https://eslint.org/docs/rules/guard-for-in
    'guard-for-in': 'off',
    'no-alert': 'error',
    // https://eslint.org/docs/rules/no-empty-function
    'no-empty-function': 'off',
    // https://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': 'off',
    // https://eslint.org/docs/rules/no-unused-expressions
    // @off it not support chai expect style
    'no-unused-expressions': 'off',
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    'prefer-promise-reject-errors': ['error', { 'allowEmptyReject': true }],
    // https://eslint.org/docs/rules/no-shadow
    'no-shadow': 'off',
    // https://eslint.org/docs/rules/line-comment-position
    'line-comment-position': ['error', { 'position': 'above' }],
    // https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: true
      }
    ],
    // https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }
    ],
    // https://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': ['error', { 'allowParens': true }]
  }
};

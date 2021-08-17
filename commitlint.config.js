module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [0], // level: disabled
    'function-rules/scope-enum': [
      2,
      'always',
      (parsed) => {
        return parsed.scope.match(/^#+./) ? [true] : [false, `Scope ${parsed.scope}, does not match with the pattern ^#+.`];
      },
    ],
  },
};

// TODO: make jest work again. (Without having babel.config.js in the root directory)
// https://github.com/cityofaustin/techstack/issues/4597

module.exports = {
  verbose: true,
  rootDir: "../",
  transform: { '^.+\\.js$': '<rootDir>/.jest/jestPreprocess.js' },
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/mocks/fileMock.js"
  },
  setupFiles: [
    "<rootDir>/.jest/register-context.js"
  ]
};

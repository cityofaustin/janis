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

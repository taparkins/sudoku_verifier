module.exports = {
  preset: 'ts-jest',
  
  // The root directory that Jest should scan for tests and modules within
  rootDir: "tests",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
     "**/?(*.)+(test).[tj]s?(x)"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
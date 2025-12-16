module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Run only tests located under the `tests/` folder
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  // Collect coverage for application source files (measure how much app code is covered by tests)
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/app/Http/Controllers/**/*.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "json"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  // coverageThreshold: { global: { branches: 80, functions: 80, lines: 80, statements: 80 } },
};

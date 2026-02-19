module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@/models/(.*)$': '<rootDir>/src/models/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/handlers/(.*)$': '<rootDir>/src/handlers/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/middleware/(.*)$': '<rootDir>/src/middleware/$1',
  },
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000,
};

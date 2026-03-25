const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/app/**/*.{ts,tsx}',
    'src/frontend/**/*.{ts,tsx}',
    'src/backend/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
};

module.exports = createJestConfig(customJestConfig);

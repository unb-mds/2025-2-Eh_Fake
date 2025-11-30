const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  // Setup file executed after the test framework is installed in the environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Use jsdom test environment to simulate browser APIs
  testEnvironment: 'jest-environment-jsdom',

  // Map the `@/...` alias to the src folder
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Only look for tests inside src
  roots: ['<rootDir>/src'],

  // Ignore node_modules and Next.js build output
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
}

module.exports = createJestConfig(customJestConfig)

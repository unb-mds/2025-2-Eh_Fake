const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
 
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Define o ambiente de teste como jsdom 
  testEnvironment: 'jest-environment-jsdom',

  // Ajusta os caminhos de importação para funcionar nos testes
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Only look for tests inside src
  roots: ['<rootDir>/src'],

  // Ignora os modulos do node
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
}
// Exporta a configuração final do Jest
module.exports = createJestConfig(customJestConfig)

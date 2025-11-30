// Importa a integração do Jest com o Next.js
const nextJest = require('next/jest');

// Cria a configuração base do Jest usando o ambiente do Next.js
const createJestConfig = nextJest({
  dir: './', // Diretório raiz do projeto Next.js
});

// Configurações personalizadas do Jest
const customJestConfig = {
  // Arquivo carregado antes de cada teste (ex.: extensões do Testing Library)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Define o ambiente de teste como o jsdom (simula o navegador)
  testEnvironment: 'jest-environment-jsdom',

  // Ajusta os caminhos de importação para funcionar nos testes
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  roots: ['<rootDir>/src'],
  // Pastas ignoradas pelo Jest
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
};

// Exporta a configuração final do Jest
module.exports = createJestConfig(customJestConfig);

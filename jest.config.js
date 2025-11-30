// Importa a integração do Jest com o Next.js
const nextJest = require('next/jest');

// Cria a configuração base do Jest usando o ambiente do Next.js
const createJestConfig = nextJest({
  dir: './', // Diretório raiz do projeto Next.js
});

// Configurações personalizadas do Jest
const customJestConfig = {

  // Arquivo carregado antes de cada teste (ex.: extensões do Testing Library)

  // Informa ao Jest para carregar o arquivo 'jest.setup.js' antes de cada teste
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.js'],
  
  // Define o ambiente de teste como 'jsdom' (simula um navegador no terminal)
  testEnvironment: 'jest-environment-jsdom',
  
  // Mapeia os caminhos de importação (ex: @/components/*) para que o Jest os entenda
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  
  // Define o diretório raiz como a pasta 'src'
  rootDir: 'src',
  // Procura por testes nas pastas __tests__ dentro de 'src'
  testPathIgnorePatterns: ['<rootDir>/../node_modules/', '<rootDir>/../.next/'],
  roots: ['<rootDir>'],
};
// Exporta a configuração final
module.exports = createJestConfig(customJestConfig);

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Porfavor dê certo 
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {

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

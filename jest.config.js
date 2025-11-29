
// Importa as configurações padrão do Next.js para o Jest
const nextJest = require('next/jest');

// Função para criar a configuração do Jest
const createJestConfig = nextJest({
  // Informa ao Next.js onde está seu projeto (neste caso, na pasta 'src')
  dir: './src',
});

// Configurações personalizadas do Jest
const customJestConfig = {
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
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}


module.exports = createJestConfig(customJestConfig)


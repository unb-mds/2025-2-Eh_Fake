const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Define a URL base da sua aplicação. O Cypress usará isso
    // em todos os comandos `cy.visit('/')`.
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      // implemente os ouvintes de eventos do node aqui
    },
  },
});
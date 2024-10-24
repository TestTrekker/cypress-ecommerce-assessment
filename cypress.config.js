const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://delivery.publix.com/', //url for publix e-commerce store
    setupNodeEvents(on, config) { // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}', // Adjust the pattern to match .spec.js or any other format you prefer
  },
})
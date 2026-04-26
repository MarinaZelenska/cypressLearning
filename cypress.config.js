const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space",

    viewportWidth: 1440,
    viewportHeight: 900,

    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,

    video: false,
    screenshotOnRunFailure: true,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
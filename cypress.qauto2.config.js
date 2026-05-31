const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.config');

module.exports = defineConfig({
  reporter: baseConfig.reporter,
  reporterOptions: baseConfig.reporterOptions,

  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto2.forstudy.space',
    env: {
      username: 'guest',
      password: 'welcome2qauto',
      userName: 'Marina',
      userLastName: 'Zelenska',
      userEmail: 'marina.zelenska.qauto2@test.com',
      userPassword: 'Aqa12345',
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});

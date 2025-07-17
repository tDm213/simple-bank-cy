import { defineConfig } from "cypress";

const allureWriter = require('@shelex/cypress-allure-plugin/writer')

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      password: 'password123',
      allure: true
    },
    reporterOptions: {
      reportDir: 'allure-results',
      overwrite: true,
      clean: true,
    },
    screenshotsFolder: 'cypress/screenshots',
    baseUrl: 'http://localhost:3000'
  },
});

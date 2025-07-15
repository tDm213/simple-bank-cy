import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    env: {
      password: 'password123',
    },
    baseUrl: 'http://localhost:3000'
  },
});

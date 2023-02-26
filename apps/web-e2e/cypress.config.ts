import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'src/support/e2e.ts',
    specPattern: 'src/e2e/**/*.cy.ts',
  },
  video: false,
  screenshotOnRunFailure: false,
});

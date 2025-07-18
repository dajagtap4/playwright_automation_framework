// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  timeout: 30000,
  reporter: 'dot',
  workers: 6,  
  fullyParallel: true,
  expect: {
    timeout: 50000,
  },
  use: {
    headless: false,
    screenshot: 'off',
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],

});

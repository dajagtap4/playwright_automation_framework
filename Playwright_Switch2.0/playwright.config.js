// playwright.config.ts or .js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 50000,
  },
  reporter: 'dot',
  use: {
    headless: false,
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
    // You can add more projects if needed (firefox, webkit, etc.)
  ],
});

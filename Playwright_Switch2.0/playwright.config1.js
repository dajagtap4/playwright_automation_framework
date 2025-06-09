import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout:30000,
  expect:{
    timeout:50000,
  },
  projects : [
    {
      name:'safari',
      use:{
        browserName : 'webkit',
        headless : false,
        screenshot : 'off',
        trace : 'on',
        ...devices['iPhone 11']
      }
    },
     {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        viewport: { width: 720, height: 720 },
      }
    }
    ],
     reporter: [['html', { open: 'never' }]],
});


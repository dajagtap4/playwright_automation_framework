const { defineConfig, devices } = require('@playwright/test');
const config = require('./src/config/env.config');


module.exports = defineConfig({
 testDir: './tests',
 outputDir: './reports/test-results',
 timeout: config.timeouts.test,
 expect: { timeout: config.timeouts.expect },


 fullyParallel: true,
 forbidOnly: !!process.env.CI,
 retries: process.env.CI ? 2 : config.retries,
 workers: process.env.CI ? 2 : config.workers,


 reporter: [
   ['list'],
   ['html', { outputFolder: './reports/html-report', open: 'never' }],
   ['junit', { outputFile: './reports/junit/results.xml' }],
   [
     'allure-playwright',
     {
       outputFolder: './reports/allure-results',
       detail: true,
       suiteTitle: false,
       environmentInfo: {
         ENV: config.env,
         BASE_URL: config.baseUrl,
         NODE_VERSION: process.version,
       },
     },
   ],
 ],


 use: {
   baseURL: config.baseUrl,
   headless: process.env.CI ? true : config.headless,
   actionTimeout: config.timeouts.action,
   navigationTimeout: config.timeouts.navigation,
   screenshot: 'only-on-failure',
   video: 'retain-on-failure',
   trace: 'retain-on-failure',
   viewport: { width: 1440, height: 900 },
 },


 projects: [
   {
     name: 'chromium',
     use: { ...devices['Desktop Chrome'] },
   },
   {
     name: 'firefox',
     use: { ...devices['Desktop Firefox'] },
   },
   {
     name: 'webkit',
     use: { ...devices['Desktop Safari'] },
   },
 ],
});

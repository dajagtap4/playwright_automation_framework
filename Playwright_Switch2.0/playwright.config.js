import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

const env = process.env.ENV || 'basecopy5'; // Set the environment variable for the config file
process.env.ENV = env;

dotenv.config({
  path: `./env/.env.${env}`,
});

// below can run from test level also see -> tests\practice\envDemo.spec.js
// console.log(`✅ Loaded environment: ${env}`);
// console.log(`🌐 BASE_URL: ${process.env.BASE_URL}`);


export default defineConfig({

  testDir: './tests',
  timeout: 30000,
  reporter: [['line'],['html'],['allure-playwright']],
  //reporter:'html',
  workers: 4, // Adjust the number of workers based on your system capabilities
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

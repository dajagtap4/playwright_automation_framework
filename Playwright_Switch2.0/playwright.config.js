import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

const env = process.env.ENV || 'LambdaT'; // Set the environment variable for the config file
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

//============================================
// lambdaTest setup
//============================================
    {
      name: "Lambda Chrome",   // Project name (you can name it anything)
      use: {                    // Browser & connection settings
         connectOptions: {       // Special option to connect to a remote browser
        wsEndpoint:           // WebSocket endpoint to connect to LambdaTest
           `wss://cdp.lambdatest.com/playwright?capabilities=` +
        encodeURIComponent(
          JSON.stringify({   // Convert capabilities object to string
            browserName: "Chrome",       // Browser to run (Chrome)
            browserVersion: "latest",    // Latest version
            platform: "Windows 11",      // OS to run on
            "LT:Options": {              // LambdaTest specific options
              user: process.env.LT_USERNAME,  // LambdaTest username
              accessKey: process.env.LT_ACCESS_KEY, // LambdaTest access key
              build: "Deepak Build",           // Build name for grouping tests
              name: "Google Test"             // Test name
            }
          })
        ),
    },
  }
}

//============================================


  ],

});

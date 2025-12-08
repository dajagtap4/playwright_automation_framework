# LamdaTest Playwright Integration

> npm install dotenv

Considering you have playwright setup with (npm init playwright@latest)

### create env folder on global location create .env in that folder.

`.env`
```
LT_USERNAME=deepakgithub4
LT_ACCESS_KEY=LT_TrkreevdHzFFiRm7Pn5ZotwGyofYYdCXrm3wQn4NQg4GtNo
BASE_URL=https://playwright.dev/
```
---
update playwrightConfig.js file as follow
Refer 
> // for lambda test ===========================

in below file
> //===========================================

```

import { defineConfig, devices } from '@playwright/test';

// for lambda test ===========================
import dotenv from 'dotenv';

dotenv.config({ path: './env/.env' });
//===========================================
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
     trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
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
   // for lambda test =========================== 
{
  name: 'chromium-lambdatest',
  use: {
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify({
          browserName: 'Chrome',
          browserVersion: 'latest',
          platform: 'Windows 11',
          'LT:Options': {
            user: process.env.LT_USERNAME,
            accessKey: process.env.LT_ACCESS_KEY,
            build: 'Deepak New Build',
            name: 'Sample LambdaTest Test',
            video: true,
            console: true,
            network: true,
          },
        })
      )}`,
    },
  },
}
//===========================================
    
  ],

});


```
---

now run test in lambdatest.
>npx playwright test --project=chromium-lambdatest -g "testname or groupname" 

like below

> npx playwright test --project=chromium-lambdatest -g "@smoke"

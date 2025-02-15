# LamdaTest Playwright Integration

> Cretate playwright project,

create .ts file (playwright-single.ts)
---
update package.json file as follow
```
"dependencies": {
    "dotenv": "^16.4.5"
  }
```
---
`laywright-single.ts`
```
import { chromium,expect } from "@playwright/test";
const cp = require('child_process');

const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
    const capabilities = {
      'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Single Build2',
        'name': 'Playwright Sample Test4',
        'user': 'jagtapda1765',
        'accessKey': 'Oaqubs4rYvOuUeWkNkQdTyGEpCTs4qZcQ4Z3IY6PyoHv4fXc6I',
        'network': true,
        'video': true,
        'console': true,
        'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
        'tunnelName': '', // Optional
        'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
        'playwrightClientVersion': playwrightClientVersion
      }
    }
  
    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    })
  
    const page = await browser.newPage()
  
    await page.goto("https://duckduckgo.com");
  
    let element = await page.locator("[name=\"q\"]");
    await element.click();
    await element.type("LambdaTest");
    await element.press("Enter");
    const title = await page.title()
  
    try {
      expect(title).toEqual('LambdaTest at DuckDuckGo')
      // Mark the test as completed or failed
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
      await teardown(page, browser)
    } catch (e) {
      await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`)
      await teardown(page, browser)
      throw e
    }
  
  })()
  
  async function teardown(page, browser) {
    await page.close();
    await browser.close();
  }
```


`npm install -g ts-node`

Install TypeScript globally (if you haven't yet):

`npm install -g typescript`

---
Compile your TypeScript file to JavaScript:

Run the TypeScript compiler (tsc) to convert your .ts file into a .js file.

`tsc tests/playwright-single.ts`

for above command give proper path else it will give error

This will generate a playwright-single.js file.

---
Run the compiled JavaScript file:

Now, you can run the compiled JavaScript file using Node.js:

`node playwright-single.js`

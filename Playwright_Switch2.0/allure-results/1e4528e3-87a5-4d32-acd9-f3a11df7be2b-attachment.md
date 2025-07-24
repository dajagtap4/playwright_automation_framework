# Test info

- Name: Test case 3
- Location: C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\demo.spec.js:30:2

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/client", waiting until "load"

    at C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\demo.spec.js:16:16
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | let webContext;
   3 |
   4 | test.beforeAll(async ({browser}) => {
   5 |
   6 |     // This creates a new browser context, which is like opening a fresh, 
   7 |     // isolated browser window (similar to incognito mode).
   8 |
   9 |     const context = await browser.newContext();
  10 |     const page = await context.newPage();
  11 |
  12 |     // browser.newContext() → creates a clean context (no cookies, no localStorage).
  13 |     // context.newPage() → opens a new tab within that context.
  14 |     
  15 |     // login
> 16 |     await page.goto("https://rahulshettyacademy.com/client");
     |                ^ Error: page.goto: Target page, context or browser has been closed
  17 |     await page.locator("#userEmail").fill("jagtapda2019@gmail.com");
  18 |     await page.locator("#userPassword").fill("Deepak@1994");
  19 |     await page.locator("[value='Login']").click();
  20 |     await page.waitForLoadState('networkidle');
  21 |
  22 |     // Below line create file state.json and saves the current session state.
  23 |     // (including cookies, localStorage, sessionStorage) to a file named state.json.
  24 |     await context.storageState({path: 'state.json'});
  25 |     webContext = await browser.newContext({ storageState: 'state.json'});
  26 |     //Above line creates a new browser context and loads the saved session from state.json
  27 | });
  28 |
  29 |
  30 |  test('Test case 3', async () => {
  31 |
  32 |     const page = await webContext.newPage();
  33 |
  34 |     await page.goto("https://rahulshettyacademy.com/client");
  35 |     await page.waitForLoadState('networkidle');
  36 |     const products = page.locator(".card-body");
  37 |     const titles = await page.locator(".card-body b").allTextContents();
  38 |     console.log(titles);
  39 |
  40 | });
  41 |
  42 |
  43 |  test('Test case 2', async () => {
  44 |
  45 |     const page = await webContext.newPage();
  46 |
  47 |     await page.goto("https://rahulshettyacademy.com/client");
  48 |     await page.waitForLoadState('networkidle');
  49 |     const products = page.locator(".card-body");
  50 |     const titles = await page.locator(".card-body b").allTextContents();
  51 |     console.log(titles);
  52 |
  53 | });
```
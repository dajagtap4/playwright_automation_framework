# Test info

- Name: E2E Tests in same browser >> @E2E - Add to cart
- Location: C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\demo.spec.js:22:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/client", waiting until "load"

    at C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\demo.spec.js:12:16
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test.describe.serial('E2E Tests in same browser', () => {
   4 |   let WebContext;
   5 |   const email = "jagtapda2019@gmail.com";
   6 |   const productName = 'ZARA COAT 3';
   7 |
   8 |   test.beforeAll(async ({ browser }) => {
   9 |     const context = await browser.newContext();
  10 |     const page = await context.newPage();
  11 |
> 12 |     await page.goto("https://rahulshettyacademy.com/client");
     |                ^ Error: page.goto: Target page, context or browser has been closed
  13 |     await page.locator("#userEmail").fill(email);
  14 |     await page.locator("#userPassword").fill("Deepak@1994");
  15 |     await page.locator("[value='Login']").click();
  16 |     await page.waitForLoadState('networkidle');
  17 |
  18 |     await context.storageState({ path: 'state.json' });
  19 |     WebContext = await browser.newContext({ storageState: 'state.json' });
  20 |   });
  21 |
  22 |   test('@E2E - Add to cart', async () => {
  23 |     const page = await WebContext.newPage();
  24 |     await page.goto("https://rahulshettyacademy.com/client");
  25 |     await page.waitForLoadState('networkidle');
  26 |
  27 |     const products = page.locator(".card-body");
  28 |     const count = await products.count();
  29 |     for (let i = 0; i < count; ++i) {
  30 |       const productText = await products.nth(i).locator("b").textContent();
  31 |       if (productText === productName) {
  32 |         await products.nth(i).locator("text= Add To Cart").click();
  33 |         break;
  34 |       }
  35 |     }
  36 |   });
  37 |
  38 |   test('@E2E2 - Open product page22', async () => {
  39 |     const page = await WebContext.newPage();
  40 |     await page.goto("https://rahulshettyacademy.com/client");
  41 |     await page.waitForLoadState('networkidle');
  42 |   });
  43 |    test('@E2E2 - Open product page11', async () => {
  44 |     const page = await WebContext.newPage();
  45 |     await page.goto("https://rahulshettyacademy.com/client");
  46 |     await page.waitForLoadState('networkidle');
  47 |   });
  48 |    test('@E2E2 - Open product page1', async () => {
  49 |     const page = await WebContext.newPage();
  50 |     await page.goto("https://rahulshettyacademy.com/client");
  51 |     await page.waitForLoadState('networkidle');
  52 |   });
  53 |    test('@E2E2 - Open product page2', async () => {
  54 |     const page = await WebContext.newPage();
  55 |     await page.goto("https://rahulshettyacademy.com/client");
  56 |     await page.waitForLoadState('networkidle');
  57 |   });
  58 |    test('@E2E2 - Open product page3', async () => {
  59 |     const page = await WebContext.newPage();
  60 |     await page.goto("https://rahulshettyacademy.com/client");
  61 |     await page.waitForLoadState('networkidle');
  62 |   });
  63 |
  64 | });
  65 |
```
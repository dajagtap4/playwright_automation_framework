# Test info

- Name: Add Item to cart
- Location: C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\WebAPIPart2.spec.js:32:1

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('.card-body b').first() to be visible

    at C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\WebAPIPart2.spec.js:40:48
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
   16 |     await page.goto("https://rahulshettyacademy.com/client");
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
   29 | //"Login will be performed once in the beforeAll() hook 
   30 | // and reused across all tests, ensuring the login process 
   31 | // doesn't repeat for each test individually."
   32 | test('Add Item to cart', async () => {
   33 |
   34 |     const productName = 'ZARA COAT 3';
   35 |     
   36 |     const page = await webContext.newPage();
   37 |
   38 |     await page.goto("https://rahulshettyacademy.com/client");
   39 |     const products = page.locator(".card-body");
>  40 |     await page.locator(".card-body b").first().waitFor();
      |                                                ^ Error: locator.waitFor: Target page, context or browser has been closed
   41 |
   42 |     // add item to cart 
   43 |     const count = await products.count();
   44 |     for (let i = 0; i < count; ++i) {
   45 |       const productText = await products.nth(i).locator("b").textContent();
   46 |        if ( productText === productName) {
   47 |           await products.nth(i).locator("text= Add To Cart").click();
   48 |           break;
   49 |        }
   50 |     }
   51 |
   52 |     //go to cart
   53 |     await page.locator("[routerlink*='cart']").click();
   54 |  
   55 |     //wait to load all items in cart
   56 |     await page.locator("div li").first().waitFor();
   57 |
   58 |     //check item added in cart
   59 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   60 |     expect(bool).toBeTruthy();
   61 |       
   62 |  });
   63 |
   64 | //"Login will be performed once in the beforeAll() hook 
   65 | // and reused across all tests, ensuring the login process 
   66 | // doesn't repeat for each test individually."
   67 |  test('place order', async () => {
   68 |
   69 |     const productName = 'ZARA COAT 3';
   70 |     
   71 |     const page = await webContext.newPage();
   72 |
   73 |     await page.goto("https://rahulshettyacademy.com/client");
   74 |     const products = page.locator(".card-body");
   75 |     await page.locator(".card-body b").first().waitFor();
   76 |
   77 |     // add item to cart 
   78 |     const count = await products.count();
   79 |     for (let i = 0; i < count; ++i) {
   80 |       const productText = await products.nth(i).locator("b").textContent();
   81 |        if ( productText === productName) {
   82 |           await products.nth(i).locator("text= Add To Cart").click();
   83 |           break;
   84 |        }
   85 |     }
   86 |
   87 |     //go to cart
   88 |     await page.locator("[routerlink*='cart']").click();
   89 |  
   90 |     //wait to load all items in cart
   91 |     await page.locator("div li").first().waitFor();
   92 |
   93 |     //check item added in cart
   94 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   95 |     expect(bool).toBeTruthy();
   96 |
   97 |     // go to checkout
   98 |     await page.locator("text=Checkout").click();
   99 |
  100 |     //Enter ind in inputfield of dropdown
  101 |     await page.locator("[placeholder*='Country']").pressSequentially("ind");
  102 |
  103 |     //wait for all options dispay for entered input
  104 |     const dropdown = page.locator(".ta-results");
  105 |     await dropdown.waitFor();
  106 |
  107 |     //get all dropdown options for 'ind'
  108 |     const optionsCount = await dropdown.locator("button").count();
  109 |
  110 |     //select "india" from dropdown options
  111 |     for (let i = 0; i < optionsCount; ++i) {
  112 |        const text = await dropdown.locator("button").nth(i).textContent();
  113 |        if (text === " India") {
  114 |           await dropdown.locator("button").nth(i).click();
  115 |           break;
  116 |        }
  117 |     }
  118 |
  119 |     //verify email
  120 |     await expect( page.locator('.user__name label[type="text"]')).toHaveText("jagtapda2019@gmail.com");
  121 |
  122 |     //click on place order 
  123 |     await page.locator(".action__submit").click();
  124 |
  125 |     //verify user successfully placesd order
  126 |     await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  127 |       
  128 |  });
  129 |  
  130 | //"Login will be performed once in the beforeAll() hook 
  131 | // and reused across all tests, ensuring the login process 
  132 | // doesn't repeat for each test individually."
  133 |  test('@API Test case 3', async () => {
  134 |
  135 |     const page = await webContext.newPage();
  136 |
  137 |     await page.goto("https://rahulshettyacademy.com/client");
  138 |     await page.waitForLoadState('networkidle');
  139 |     const products = page.locator(".card-body");
  140 |     const titles = await page.locator(".card-body b").allTextContents();
```
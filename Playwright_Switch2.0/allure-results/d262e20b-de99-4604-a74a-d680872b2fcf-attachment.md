# Test info

- Name: @E2E
- Location: C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\demo.spec.js:20:1

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('.card-body b').first() to be visible

    at C:\Users\deepak.jagtap\Desktop\playwright_automation_framework\Playwright_Switch2.0\tests\APIs\demo.spec.js:31:48
```

# Page snapshot

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- paragraph: Home | Search
- heading "Filters" [level=4]
- textbox "search"
- heading "Price Range" [level=6]
- textbox "Min Price"
- textbox "Max Price"
- heading "Categories" [level=6]
- text: 
- checkbox
- text: fashion
- checkbox
- text: electronics
- checkbox
- text: household
- heading "Sub Categories" [level=6]
- text: 
- checkbox
- text: t-shirts
- checkbox
- text: shirts
- checkbox
- text: shoes
- checkbox
- text: mobiles
- checkbox
- text: laptops
- heading "Search For" [level=6]
- text: 
- checkbox
- text: men
- checkbox
- text: women Showing 3 results | User can only see maximum 9 products on a page
- img
- heading "ZARA COAT 3" [level=5]
- text: $ 31500
- button "View"
- button " Add To Cart"
- img
- heading "ADIDAS ORIGINAL" [level=5]
- text: $ 31500
- button "View"
- button " Add To Cart"
- img
- heading "IPHONE 13 PRO" [level=5]
- text: $ 231500
- button "View"
- button " Add To Cart"
- list "Pagination":
  - listitem: « Previous page
  - listitem: You're on page 1
  - listitem: Next page »
- text: Design and Developed By - Kunal Sharma
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const { Console, log } = require('console');
   3 | let WebCOntext;
   4 |
   5 | test.beforeAll(async ({ browser }) => {
   6 |      
   7 |     const contex = await browser.newContext();
   8 |     const page = await contex.newPage();
   9 |
   10 |     const email = "jagtapda2019@gmail.com";
   11 |     await page.goto("https://rahulshettyacademy.com/client");
   12 |     await page.locator("#userEmail").fill(email);
   13 |     await page.locator("#userPassword").fill("Deepak@1994");
   14 |     await page.locator("[value='Login']").click();
   15 |
   16 |     await contex.storageState({path: 'state.json'});
   17 |     WebCOntext = await browser.newContext({ storageState: 'state.json'  });
   18 | });
   19 |
   20 | test('@E2E', async () => {
   21 |
   22 |     const email = "jagtapda2019@gmail.com";
   23 |     const productName = 'ZARA COAT 3';
   24 |
   25 |     const page = await WebCOntext.newPage();
   26 |     await page.goto("https://rahulshettyacademy.com/client")
   27 |     const products = page.locator(".card-body");
   28 |
   29 |     //waiting for all products display
   30 |     await page.waitForLoadState('networkidle'); //below line is optional for this line
>  31 |     await page.locator(".card-body b").first().waitFor();
      |                                                ^ Error: locator.waitFor: Target page, context or browser has been closed
   32 |
   33 |     // add item to cart 
   34 |     const count = await products.count();
   35 |     for (let i = 0; i < count; ++i) {
   36 |       const productText = await products.nth(i).locator("b").textContent();
   37 |        if ( productText === productName) {
   38 |           await products.nth(i).locator("text= Add To Cart").click();
   39 |           break;
   40 |        }
   41 |     }
   42 |
   43 |     //go to cart
   44 |     await page.locator("[routerlink*='cart']").click();
   45 |  
   46 |     //wait to load all items in cart
   47 |     await page.locator("div li").first().waitFor();
   48 |
   49 |     //check item added in cart
   50 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   51 |     expect(bool).toBeTruthy();
   52 |
   53 |     // go to checkout
   54 |     await page.locator("text=Checkout").click();
   55 |
   56 |     //Enter ind in inputfield of dropdown
   57 |     await page.locator("[placeholder*='Country']").pressSequentially("ind");
   58 |
   59 |     //wait for all options dispay for entered input
   60 |     const dropdown = page.locator(".ta-results");
   61 |     await dropdown.waitFor();
   62 |
   63 |     //get all dropdown options for 'ind'
   64 |     const optionsCount = await dropdown.locator("button").count();
   65 |
   66 |     //select "india" from dropdown options
   67 |     for (let i = 0; i < optionsCount; ++i) {
   68 |        const text = await dropdown.locator("button").nth(i).textContent();
   69 |        if (text === " India") {
   70 |           await dropdown.locator("button").nth(i).click();
   71 |           break;
   72 |        }
   73 |     }
   74 |
   75 |     //verify email
   76 |     await expect( page.locator('.user__name label[type="text"]')).toHaveText(email);
   77 |
   78 |     //click on place order 
   79 |     await page.locator(".action__submit").click();
   80 |
   81 |     //verify user successfully placesd order
   82 |     await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   83 |
   84 |     //assert order id on same page
   85 |     const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
   86 |
   87 |     //go to Orders(order history page)
   88 |     await page.locator("button[routerlink*='myorders']").click();
   89 |
   90 |     //wait to load all rows
   91 |     await page.locator("tbody").waitFor();
   92 |
   93 |     //store all rows 
   94 |    const rows = await page.locator('tbody tr');
   95 |
   96 |    //click on respected order is's view 
   97 |    for (let i = 0; i < await rows.count(); ++i) {
   98 |       const rowOrderId = await rows.nth(i).locator('th').textContent();
   99 |
  100 |       if(orderId.includes(rowOrderId)){
  101 |          // will navigates to order summary page
  102 |          await rows.nth(i).locator('button.btn-primary').click(); 
  103 |          break;
  104 |       }
  105 |     }
  106 |
  107 |     // assert order id at order summary page
  108 |     const orderIdDetails  = await page.locator('div.col-text').textContent();
  109 |     expect(orderId.includes(orderIdDetails)).toBeTruthy();
  110 |
  111 |     console.log('User successfully ordered item and verified it in order page .....');
  112 |       
  113 |  });
  114 |  
  115 |  
  116 |  
  117 |  
  118 |  
  119 |  
  120 |  
  121 |  
  122 |  
```
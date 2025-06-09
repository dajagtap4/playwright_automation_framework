const { test, expect } = require('@playwright/test');
const { Console, log } = require('console');

test('@E2E', async ({ page }) => {

    const email = "jagtapda2019@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    //login
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Deepak@1994");
    await page.locator("[value='Login']").click();

    //waiting for all products display
    await page.waitForLoadState('networkidle'); //below line is optional for this line
    await page.locator(".card-body b").first().waitFor();

    // add item to cart 
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
       if (await products.nth(i).locator("b").textContent() === productName) {
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }

    //go to cart
    await page.locator("[routerlink*='cart']").click();
 
    //wait to load all items in cart
    await page.locator("div li").first().waitFor();

    //check item added in cart
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    // go to checkout
    await page.locator("text=Checkout").click();

    //Enter ind in inputfield of dropdown
    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    //wait for all options dispay for entered input
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    //get all dropdown options for 'ind'
    const optionsCount = await dropdown.locator("button").count();

    //select "india" from dropdown options
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }

    //verify email
    await expect( page.locator('.user__name label[type="text"]')).toHaveText(email);

    //click on place order 
    await page.locator(".action__submit").click();

    //verify user successfully placesd order
    await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //assert order id on same page
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    //go to Orders(order history page)
    await page.locator("button[routerlink*='myorders']").click();

    //wait to load all rows
    await page.locator("tbody").waitFor();

    //store all rows 
   const rows = await page.locator('tbody tr');

   //click on respected order is's view 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator('th').textContent();

      if(orderId.includes(rowOrderId)){
         // will navigates to order summary page
         await rows.nth(i).locator('button.btn-primary').click(); 
         break;
      }
    }

    // assert order id at order summary page
    const orderIdDetails  = await page.locator('div.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    console.log('User successfully ordered item and verified it in order page .....');
      
 });
 
 
 
 
 
 
 
 
 
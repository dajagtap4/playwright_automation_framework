const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
      //login
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("jagtapda2019@gmail.com");
    await page.locator("#userPassword").fill("Deepak@1994");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({ storageState: 'state.json'});
})

//"Login will be performed once in the beforeAll() hook 
// and reused across all tests, ensuring the login process 
// doesn't repeat for each test individually."
test('Add Item to cart', async () => {

    const productName = 'ZARA COAT 3';
    
    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();

    // add item to cart 
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
      const productText = await products.nth(i).locator("b").textContent();
       if ( productText === productName) {
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
      
 });

//"Login will be performed once in the beforeAll() hook 
// and reused across all tests, ensuring the login process 
// doesn't repeat for each test individually."
 test('place order', async () => {

    const productName = 'ZARA COAT 3';
    
    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    await page.locator(".card-body b").first().waitFor();

    // add item to cart 
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
      const productText = await products.nth(i).locator("b").textContent();
       if ( productText === productName) {
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
    await expect( page.locator('.user__name label[type="text"]')).toHaveText("jagtapda2019@gmail.com");

    //click on place order 
    await page.locator(".action__submit").click();

    //verify user successfully placesd order
    await expect( page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
      
 });
 
//"Login will be performed once in the beforeAll() hook 
// and reused across all tests, ensuring the login process 
// doesn't repeat for each test individually."
 test('@API Test case 3', async () => {

    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

})

//"Login will be performed once in the beforeAll() hook 
// and reused across all tests, ensuring the login process 
// doesn't repeat for each test individually."
test('@API Test case 4', async () => {
    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = page.locator(".card-body");

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
 })

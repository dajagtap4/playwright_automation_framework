// what we are doing here -> only bypassing login step with api 

// This is very simple approch towards "login API" only for basic understanding
// for advanced and suggested approch refer -> tests\APIs\WebAPIPart1.spec.js

// This is Episode 1 where we cover Login API 
// in Episode 2 we will se Order API where ui directly open order placed page 
// and we will only assert order id.
// ==============================================================================

const { test, expect, request } = require('@playwright/test');
const loginPayLoad = {userEmail:"jagtapda2019@gmail.com",userPassword:"Deepak@1994"};
let token;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:loginPayLoad
        });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    
});

test('login api with part 1', async ({ page }) => {

    // at below line 'await' is must must must required
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

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
 });
 
 
 
 
 
 
 
 
 

 
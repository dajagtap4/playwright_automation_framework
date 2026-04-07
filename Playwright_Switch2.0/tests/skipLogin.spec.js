const {test, expect} = require('@playwright/test');
const authFile = 'tests/authorization.json';
test('skip login 1' , async ({page})=> {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("jagtapda2019@gmail.com");
    await page.locator("#userPassword").fill("Deepak@1994");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.context().storageState({ path: authFile });
});

test('skip login 2', async ({browser})=> {

    await page.context().storageState({ path: authFile });
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
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
});
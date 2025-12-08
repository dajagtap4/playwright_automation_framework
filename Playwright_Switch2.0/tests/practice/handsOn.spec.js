const { test, expect } = require('@playwright/test');

test('practice', async ({ page }) => {

    const productName = 'ADIDAS ORIGINAL';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("jagtapda2019@gmail.com");
    await page.locator("#userPassword").fill("Deepak@1994");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle'); //below line is optional for this line
    await page.locator(".card-body b").first().waitFor();

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
    const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible();
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

   for (let i = 0; i < optionsCount; ++i) {
      const visibleOptions = await dropdown.locator("button").nth(i).textContent();
      if(visibleOptions === " India"){
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

    //save order id
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

    //go to Orders(order history page)
    await page.locator("button[routerlink*='myorders']").click();

    //wait to load all rows
    await page.locator("tbody").waitFor();

     //store all rows 
   const rows = await page.locator('tbody tr');

   for (let i = 0; i < await rows.count(); ++i) {
     const OrderIdByRow = await rows.nth(i).locator('th').textContent();
     if(orderId.includes(OrderIdByRow)){
      await rows.nth(i).getByText("View").click();
      break;
     }
   }

   const orderIdDetails = await page.locator("div.col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

  console.log('User successfully ordered item and verified it in order page .....');
 });  

test('Client App login 34', async ({ page }) => {

   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();
   
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator('.card-body').filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:' Add To Cart'}).click();

   await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();

   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

   await page.getByRole("button",{name:"Checkout"}).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");
})

test('Go here and there', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await page.goto("http://google.com");

  await page.goBack();

  await page.waitForTimeout(2000);

  await page.goForward();

  await page.waitForTimeout(1000);
});  

test('Hide and Show', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //check Hide Button visible?
  await expect(page.locator('#hide-textbox')).toBeVisible();
  //Click on the Hide Button 
  await page.locator('#hide-textbox').click();

  await page.waitForTimeout(2000);
  
  // verify box is hidden
  await expect(page.locator('#displayed-text')).toBeHidden();

  //check Show Button visible?
  await expect(page.locator('#show-textbox')).toBeVisible();
  //Click on the show Button 
  await page.locator('#show-textbox').click();

  await page.waitForTimeout(2000);
});  
const { test, expect } = require('@playwright/test');

test('@Webst Client App login 34', async ({ page }) => {

   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
   await page.getByRole('button',{name:"Login"}).click();

   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   //add product to cart
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

   //click on cart button 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

   //verify added product in cart
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

   //click on checkout
   await page.getByRole("button",{name :"Checkout"}).click();

   //enter input in country dropdown
   await page.getByPlaceholder("Select Country").pressSequentially("ind");

   //select India from dropdown
   await page.getByRole("button",{name :"India"}).nth(1).click();

   //click on the place order button
   await page.getByText("PLACE ORDER").click();

   // verify text 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

   //store order id without '|'
   const rawText = await page.locator("label.ng-star-inserted").textContent();
   const orderId = rawText?.replace(/\|/g, '').trim(); // Remove all '|' and trim spaces

   //go to myorders 
   await page.locator("button[routerlink^='/dashboard/myorders']").click();

   //click on View for matching orderId
   await page.locator("tbody tr").filter({hasText:orderId})
   .getByRole("button",{name:"View"}).click();

   //verify orderId matching or not
   const orderIdonSUmmeryPage = await page.locator("div.col-text").textContent();
   expect(orderIdonSUmmeryPage === orderId).toBeTruthy();

   console.log('User successfully ordered item and verified it in order page .....');
});
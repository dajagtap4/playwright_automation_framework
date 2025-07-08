const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../../utils/APIUtils');
const loginPayLoad = {userEmail: "jagtapda2019@gmail.com", userPassword: "Deepak@1994"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};

let response;

 test.beforeAll(async()=>
{
   const apiContext = await request.newContext();
   const apiutils = new APIUtils(apiContext,loginPayLoad);
   response = await apiutils.createOrder(orderPayLoad);
  
});

 test('@API Place the order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },response.token);

    await page.goto('https://rahulshettyacademy.com/client');
    //go to Orders(order history page)
    await page.locator("button[routerlink*='myorders']").click();
    //wait to load all rows
    await page.locator("tbody").waitFor();
    //store all rows 
    const rows = await page.locator('tbody tr');

   //click on respected order's view button
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator('th').textContent();

      if(response.orderId.includes(rowOrderId)){
         // will navigates to order summary page
         await rows.nth(i).locator('button.btn-primary').click(); 
         break;
      }
    }

    // assert order id at order summary page
    const orderIdDetails  = await page.locator('div.col-text').textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    console.log('User successfully ordered item and verified it in order page .....');
      
 });
 
 
 
 
 
 
 
 
 
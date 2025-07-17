// What we bypass with api? see below 4 points.
// we bypass -> 1.login  2.add to cart  3.checkout  4.place order
// by code (not api) we will go to order page and verify order is present 
// in order list, then click on view button on that perticular order. 

// in this file e have only one test suppose the will be multiple tests 
// then all tests run parallelly but for every test that order api token will in use.

// in this file (Episode 2) note that (for multiple tests) order api will in use for 
// every test and for every test new browser with tab will open which is in scope of improvement.

// in WebAPIpart2 files we will se login once then all test will run on same 
// browsers tab so no need to login api for every test on different browser this is advanced concept.

//=======================================================================================================


const { test, expect, request } = require('@playwright/test');
const loginPayLoad = {userEmail:"jagtapda2019@gmail.com",userPassword:"Deepak@1994"};
const orderPayLoad = {orders:[{country:"British Indian Ocean Territory",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
let token;
let orderId;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();

    // this is for login api
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:loginPayLoad
        });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);


    //this is for place 'order' api
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data:orderPayLoad,
            headers:{
                'Authorization': token,
                'Content-Type' : 'application/json'
            }
        });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
    
});

test('order api with part 1', async ({ page }) => {

    // at below line 'await' is must must must required
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

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
 
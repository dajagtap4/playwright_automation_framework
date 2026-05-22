const { test, expect } = require('../../../src/fixtures/test.fixture');

test.describe('@regression @orders Place order — single user E2E', () => {
 test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium-only test');


 test('@smoke TC-ORDER-001: Place order for ZARA COAT 3', async ({ pages }) => {
   const {
     loginPage,
     dashboardPage,
     cartPage,
     orderReviewPage,
     orderHistoryPage,
   } = pages;


   const username = 'jagtapda2019@gmail.com';
   const password = 'Deepak@1994';
   const productName = 'ZARA COAT 3';
   const countryCode = 'ind';
   const countryName = 'India';


   await loginPage.goto();
   await loginPage.login(username, password);


   await dashboardPage.addProductToCart(productName);
   await dashboardPage.goToCart();


   await cartPage.expectProductInCart(productName);
   await cartPage.checkout();


   await orderReviewPage.expectEmail(username);
   await orderReviewPage.selectCountry(countryCode, countryName);
   const orderId = await orderReviewPage.placeOrderAndGetId();


   expect(orderId, 'Order ID must be returned after placing order').toBeTruthy();


   await dashboardPage.goToOrders();
   await orderHistoryPage.openOrderById(orderId);
   const detailOrderId = await orderHistoryPage.getDetailOrderId();
   expect(orderId.includes(detailOrderId)).toBeTruthy();
 });
});

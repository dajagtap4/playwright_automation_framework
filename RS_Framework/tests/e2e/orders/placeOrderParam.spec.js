const { test, expect } = require('../../../src/fixtures/test.fixture');
const { loadJson } = require('../../../src/utils/dataLoader');


const orderDataSet = loadJson('placeOrder.data.json');


test.describe('@regression @orders Place order — parameterized E2E', () => {
 test.describe.configure({ mode: 'serial' });


 for (const data of orderDataSet) {
   test(`@smoke ${data.testId}: ${data.description}`, async ({ pages }) => {
     const {
       loginPage,
       dashboardPage,
       cartPage,
       orderReviewPage,
       orderHistoryPage,
     } = pages;


     await loginPage.goto();
     await loginPage.login(data.username, data.password);


     await dashboardPage.addProductToCart(data.productName);
     await dashboardPage.goToCart();


     await cartPage.expectProductInCart(data.productName);
     await cartPage.checkout();


     await orderReviewPage.expectEmail(data.username);
     await orderReviewPage.selectCountry(
       data.shipping.countryCode,
       data.shipping.countryName,
     );
     const orderId = await orderReviewPage.placeOrderAndGetId();


     expect(orderId, 'Order ID must be returned after placing order').toBeTruthy();


     await dashboardPage.goToOrders();
     await orderHistoryPage.openOrderById(orderId);
     const detailOrderId = await orderHistoryPage.getDetailOrderId();
     expect(orderId.includes(detailOrderId)).toBeTruthy();
   });
 }
});

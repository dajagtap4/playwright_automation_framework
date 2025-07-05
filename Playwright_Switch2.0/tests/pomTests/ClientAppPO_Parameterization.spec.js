 const {test, expect} = require('@playwright/test');
 const { POManager } = require('../../POMClientApp/POManager');
 const dataset = JSON.parse(JSON.stringify(require("../../utils/placeorderTestData.json")));

 // 79. Implementing Parameterization in running tests with different data sets
 //https://globallogic.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31111052#overview
for(const data of dataset)
{
 test(`Client App login for ${data.productName}`, async ({ page }) => {
    
    const poManager = new POManager(page);
    const products = page.locator(".card-body");

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin(data.username,data.password);

    // add item to cart -> go to cart
    const dashboardpage = poManager.getDashboardPage();
    await dashboardpage.searchProductAddCart(data.productName);
    await dashboardpage.navigateToCart();

    // verify that item added to cart, click on checkout button 
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    // at checkout page, verify email, select country, Place Order
    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.VerifyEmailId(data.username);
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    // navigate To Orders page
    await dashboardpage.navigateToOrders();

    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 });
}


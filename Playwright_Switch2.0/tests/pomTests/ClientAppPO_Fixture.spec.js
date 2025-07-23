 const {test, expect} = require('@playwright/test');
 const { POManager } = require('../../POMClientApp/POManager');
 const {customtest} = require('../../utils/test-base');  
  
  
  //udemy 80. How to pass test data as fixture by extend test annotation behaviour
  //https://globallogic.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31111054#overview
 customtest("@web Client App login", async ({page,testDataForOrder2})=>
 {
   const poManager = new POManager(page);
  
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrder2.username,testDataForOrder2.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testDataForOrder2.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder2.productName);
    await cartPage.Checkout();
})
 const {test, expect} = require('@playwright/test');
 const { POManager } = require('../../pageobjects/POManager');
 const {customtest} = require('../../utils/test-base');  
  
  
  //udemy 80. How to pass test data as fixture by extend test annotation behaviour
  //https://globallogic.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31111054#overview
 customtest("Client App login", async ({page,testDataForOrder})=>
 {
   const poManager = new POManager(page);
  
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(testDataForOrder.productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
})
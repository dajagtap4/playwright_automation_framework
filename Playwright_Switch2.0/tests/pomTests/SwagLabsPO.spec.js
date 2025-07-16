 const {test, expect} = require('@playwright/test');
 const { POManager } = require('../../POMSwagLabs/POManager');

  test("SwaglabsPOM test", async ({ page }) => {

    const poManager = new POManager(page);
    const ExpectedProduct = "Sauce Labs Bike Light";

    //login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin("standard_user","secret_sauce");

    // add item to cart
    const dashboard = poManager.getDashboardPage();
    await dashboard.addToCartProduct(ExpectedProduct);
    await dashboard.navigateToCart();

    //verify product in cart
    const cart = poManager.getCartPage();
    await cart.VerifyProductIsDisplayedAndClickOnCheckout(ExpectedProduct);

    // enter my info and click on the Continue button
    const info = poManager.getMyInfoPage();
    await info.enterInfoAndContinue();

    //verify product listed on overview page
    const overview = poManager.getOverviewPage();
    await overview.VerifyProductIsDisplayedAndClickOnFinish(ExpectedProduct);

    //verify thanks page
    const thanks = poManager.getThanksPage();
    await thanks.verifyThanksPage();

  });
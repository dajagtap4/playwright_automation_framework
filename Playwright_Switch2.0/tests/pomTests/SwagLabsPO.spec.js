 const { POManager } = require('../../POMSwagLabs/POManager');
 const { test, expect } = require('../../Fixtures/swaglabs.fixture');

  test("SwaglabsPOM test", async ({page,login}) => {

    const poManager = new POManager(page);
    const ExpectedProduct = "Sauce Labs Bike Light";

    // login
    // Remove below lines (the 'login' fixture already logs in for you):
    // const login = poManager.getLoginPage();
    // await login.goTo();
    // await login.validLogin("standard_user","secret_sauce");

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
// This file includes POM, fixtuires, and assertions.
// most updated file as of now. (23 july 2025) 
// Jenkins build - http://localhost:8080/job/playwright_July_2025/32/console
// ===========================================================================

 const { POManager } = require('../../POMSwagLabs/POManager');
 const { test } = require('../../Fixtures/swaglabs.fixture');
 const { expect } = require('@playwright/test');
 
  test("SwaglabsPOM test", async ({page,login}) => {

    // Post-login assertion: check for a dashboard element or URL
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html"); 

    const poManager = new POManager(page);
    const ExpectedProduct = "Sauce Labs Bike Light";

    // login
    // we are using login fixture from swaglabs.fixture.js, so below code is not needed.
    // const login = poManager.getLoginPage();
    // await login.goTo();
    // await login.validLogin("standard_user","secret_sauce");

    // add item to cart
    const dashboard = poManager.getDashboardPage();
    await dashboard.addToCartProduct(ExpectedProduct);
    // assert item added to cart
    const cartBadge = dashboard.getCartBadge();
    // get cart badge and verify it has 1 item
    await expect(cartBadge).toHaveText("1");
    // then navigate to cart page
    await dashboard.navigateToCart();
    // and verify URL
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    //verify product in cart
    const cart = poManager.getCartPage();
    const isPresentInCart = await cart.isProductInCart(ExpectedProduct);
    expect(isPresentInCart).toBeTruthy();
    // Continue (Click) with checkout
    await cart.clickCheckout();
    // verify checkout page URL to ensure we are on the right page
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

    // Enter my info and continue
    const info = poManager.getMyInfoPage();
    await info.enterInfoAndContinue();
    // verify overview page URL to ensure we are on the right page
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

    //verify product listed on overview page
    const overview = poManager.getOverviewPage();
    const isPresentInOverview = await overview.isProductDisplayed(ExpectedProduct);
    expect(isPresentInOverview).toBeTruthy();
    // click on finish button
    await overview.clickFinish();

    //verify thanks text on complete page
    const thanks = poManager.getThanksPage();
    const actualThanksText  = await thanks.verifyThanksPage();
    expect(actualThanksText).toEqual('Thank you for your order!');

  });
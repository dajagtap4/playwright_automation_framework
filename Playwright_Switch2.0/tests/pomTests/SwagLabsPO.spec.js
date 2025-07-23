// This file includes POM, fixtuires, and assertions.
// most updated file as of now. (23 july 2025) 
// Jenkins build - http://localhost:8080/job/playwright_July_2025/32/console
// ===========================================================================

 const { POManager } = require('../../POMSwagLabs/POManager');
 const { test } = require('../../Fixtures/swaglabs.fixture');
 const { expect } = require('@playwright/test');
 const { urls, messages } = require('../../utils/urls');
 const { products } = require('../../utils/testData');
 const jsonData = require('../../utils/testData.json');
 
  test("@web SwaglabsPOM test", async ({page,login}) => {

    // Post-login assertion: check for a dashboard element or URL
    await expect(page).toHaveURL(urls.dashboard); 

    const poManager = new POManager(page);
    const ExpectedProduct = products.expectedProduct;

    // login
    // we are using login fixture from swaglabs.fixture.js, instead of below commented code
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
    await expect(page).toHaveURL(urls.cart);

    //verify product in cart
    const cart = poManager.getCartPage();
    const isPresentInCart = await cart.isProductInCart(ExpectedProduct);
    expect(isPresentInCart).toBeTruthy();
    // Continue (Click) with checkout
    await cart.clickCheckout();
    // verify checkout page URL to ensure we are on the right page
    await expect(page).toHaveURL(urls.checkoutStepOne);

    // Enter my info and continue
    const info = poManager.getMyInfoPage();
    await info.enterInfoAndContinue();
    // verify overview page URL to ensure we are on the right page
    await expect(page).toHaveURL(urls.checkoutStepTwo);

    //verify product listed on overview page
    const overview = poManager.getOverviewPage();
    const isPresentInOverview = await overview.isProductDisplayed(ExpectedProduct);
    expect(isPresentInOverview).toBeTruthy();
    // click on finish button
    await overview.clickFinish();

    //verify thanks text on complete page
    const thanks = poManager.getThanksPage();
    const actualThanksText  = await thanks.verifyThanksPage();
    expect(actualThanksText).toEqual(jsonData.messages.orderSuccess);

  });
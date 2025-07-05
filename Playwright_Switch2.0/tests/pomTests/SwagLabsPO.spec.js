 const {test, expect} = require('@playwright/test');
 const { POManager } = require('../../POMSwagLabs/POManager');

  test("Swaglabs", async ({ page }) => {

    const poManager = new POManager(page);
    const ExpectedProduct = "Sauce Labs Fleece Jacket";

    //login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin("standard_user","secret_sauce");

    // add item to cart
    const dashboard = poManager.getDashboardPage();
    await dashboard.addToCartProduct(ExpectedProduct);
    await dashboard.navigateToCart();
  });
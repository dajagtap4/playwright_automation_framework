 const {test, expect} = require('@playwright/test');
 const { POManager } = require('../../POMSwagLabs/POManager');

  test("Swaglabs", async ({ page }) => {

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

    

    //verify product in cart
    // const productsInCart = page.locator('.cart_item_label a');
    // const count = await productsInCart.count();

    // for(let i=0;i<count;i++)
    // {
    //   const ProductNameIncart = await productsInCart.nth(i).textContent();
    //   if(ProductNameIncart === ExpectedProduct)
    //   {
    //     //click on the Checkbox button
    //     await page.locator('#checkout').click();
    //   }
    // }

    // await page.locator("#first-name").fill("Deepak");
    // await page.locator("#last-name").fill("Jagtap");
    // await page.locator("#postal-code").fill("111111");

    //await page.locator("#continue").click();

    for(let i=0;i<count;i++)
    {
      const ProductsInCheckoutOverview = await productsInCart.nth(i).textContent();
      if(ProductsInCheckoutOverview === ExpectedProduct)
      {
        //click on the Checkbox button
        await page.locator('#finish').click();
      }
    }

    const thanksText = await page.locator('text=Thank you for your order!').textContent();
    expect(thanksText).toEqual('Thank you for your order!');
  });
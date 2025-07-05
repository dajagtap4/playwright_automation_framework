const {test, expect} = require('@playwright/test');
class CartPage
{
    
constructor(page)
{
    this.page = page;
    this.productsInCart = page.locator(".cart_item_label a");
    this.checkout = page.locator("#checkout");
}

async VerifyProductIsDisplayedAndClickOnCheckout(productName)
{
    const count = await this.productsInCart.count();

    for(let i=0;i<count;i++)
    {
      const ProductNameIncart = await this.productsInCart.nth(i).textContent();
      if(ProductNameIncart === productName)
      {
        //click on the Checkbox button
        await this.checkout.click();
      }
    }
   
    // await this.cartProducts.waitFor();
    // const bool =await this.page.locator("h3:has-text('"+productName+"')").isVisible();
    // //const bool =await this.getProductLocator(productName).isVisible();
    // expect(bool).toBeTruthy();

}

}
module.exports = {CartPage};
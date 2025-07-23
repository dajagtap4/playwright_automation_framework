const {test, expect} = require('@playwright/test');
class CartPage
{
    
constructor(page)
{
    this.page = page;
    this.productsInCart = page.locator(".cart_item_label a");
    this.checkout = page.locator("#checkout");
}

async isProductInCart(productName)
{
    const count = await this.productsInCart.count();

    for(let i=0;i<count;i++)
    {
      const ProductNameIncart = await this.productsInCart.nth(i).textContent();
      if(ProductNameIncart === productName)
      {
        return true;
      }
    }
    return false;
}

async clickCheckout() {
  await this.checkout.click();
}

}
module.exports = {CartPage};
class DashboardPage
{
constructor(page)
{
    this.page = page;
    this.products = page.locator('.inventory_item_description');
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("#shopping_cart_container");
}

async addToCartProduct(productName)
{
    const productList = this.products;
    const count = await productList.count();

    for(let i=0;i<count;i++){
      const productText = await productList.nth(i).locator(' div a').textContent();
      if(productText === productName){
        await productList.nth(i).locator('div:nth-of-type(2) button').click();
        break;
      }
    }
}

async navigateToCart()
{
    await this.cart.click();
}

getCartBadge()
{
    return this.page.locator(".shopping_cart_badge");
}

}
module.exports = {DashboardPage};
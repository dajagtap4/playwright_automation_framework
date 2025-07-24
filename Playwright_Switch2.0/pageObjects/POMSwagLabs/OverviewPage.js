const {test, expect} = require('@playwright/test');
class OverviewPage
{
    
constructor(page)
{
    this.page = page;
    this.AvailableProducts = page.locator(".cart_item_label a");
    this.finish = page.locator('.cart_footer button:nth-of-type(2)');
}

async isProductDisplayed(productName)
{
    await this.page.waitForLoadState('networkidle');
    const count = await this.AvailableProducts.count();

    for(let i=0;i<count;i++)
    {
      const ProductsInCheckoutOverview = await this.AvailableProducts.nth(i).textContent();
      if(ProductsInCheckoutOverview === productName)
      {
        return true;
      }
    }
   
  return false;
}
  async clickFinish() { 
    await this.finish.click();
  } 
}
module.exports = {OverviewPage};
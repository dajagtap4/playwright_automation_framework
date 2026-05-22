const { BasePage } = require('./BasePage');

class DashboardPage extends BasePage {
 constructor(page) {
   super(page);
   this.productCards = page.locator('.card-body');
   this.productTitles = page.locator('.card-body b');
   this.cartNav = page.locator("[routerlink*='cart']");
   this.ordersNav = page.locator("button[routerlink*='myorders']");
 }


 async getAllProductTitles() {
   await this.productTitles.first().waitFor();
   return this.productTitles.allTextContents();
 }


 async addProductToCart(productName) {
   this.log.info(`Adding product to cart: "${productName}"`);
   await this.productCards.first().waitFor();
   const count = await this.productCards.count();


   for (let i = 0; i < count; i += 1) {
     const card = this.productCards.nth(i);
     const title = (await card.locator('b').textContent())?.trim();


     if (title === productName) {
       await card.locator('text= Add To Cart').click();
       return;
     }
   }


   throw new Error(`Product "${productName}" not found on dashboard`);
 }


 async goToCart() {
   await this.cartNav.click();
   await this.waitForLoad();
 }


 async goToOrders() {
   await this.ordersNav.click();
   await this.waitForLoad();
 }
}


module.exports = { DashboardPage };

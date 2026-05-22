const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
 constructor(page) {
   super(page);
   this.cartItems = page.locator('div li');
   this.checkoutButton = page.locator('text=Checkout');
 }


 productByName(productName) {
   return this.page.locator(`h3:has-text("${productName}")`);
 }


 async waitForCartLoaded() {
   await this.cartItems.first().waitFor();
 }


 async expectProductInCart(productName) {
   this.log.info(`Verifying product in cart: "${productName}"`);
   await this.waitForCartLoaded();
   await expect(this.productByName(productName)).toBeVisible();
 }


 async checkout() {
   this.log.info('Proceeding to checkout');
   await this.checkoutButton.click();
   await this.waitForLoad();
 }
}


module.exports = { CartPage };



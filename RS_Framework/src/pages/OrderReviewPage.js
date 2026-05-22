const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

const ORDER_CONFIRMATION_TEXT = ' Thankyou for the order. ';


class OrderReviewPage extends BasePage {
 constructor(page) {
   super(page);
   this.countryInput = page.locator("[placeholder*='Country']");
   this.countryDropdown = page.locator('.ta-results');
   this.emailField = page.locator(".user__name [type='text']").first();
   this.submitButton = page.locator('.action__submit');
   this.confirmationHeader = page.locator('.hero-primary');
   this.orderIdLabel = page.locator('.em-spacer-1 .ng-star-inserted');
 }


 async selectCountry(searchTerm, countryName) {
   this.log.info(`Selecting country: "${countryName}" (search: "${searchTerm}")`);
   await this.countryInput.pressSequentially(searchTerm);
   await this.countryDropdown.waitFor();


   const options = this.countryDropdown.locator('button');
   const count = await options.count();


   for (let i = 0; i < count; i += 1) {
     const text = (await options.nth(i).textContent())?.trim();
     if (text === countryName) {
       await options.nth(i).click();
       return;
     }
   }


   throw new Error(`Country "${countryName}" not found in dropdown`);
 }


 async expectEmail(expectedEmail) {
   await expect(this.emailField).toHaveText(expectedEmail);
 }


 async placeOrderAndGetId() {
   this.log.info('Submitting order');
   await this.submitButton.click();
   await expect(this.confirmationHeader).toHaveText(ORDER_CONFIRMATION_TEXT);


   const count = await this.orderIdLabel.count();
   if (count !== 1) {
     this.log.warn(`Expected 1 order ID element but found ${count}; using the first`);
   }
   const orderId = (await this.orderIdLabel.first().textContent())?.replace(/\|/g, '').trim();
   this.log.info(`Order placed: ${orderId}`);
   return orderId;
 }
}


module.exports = { OrderReviewPage };



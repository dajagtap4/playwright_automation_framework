const {test, expect} = require('@playwright/test');
class ThanksPage
{
    
constructor(page)
{
    this.page = page;
    this.thanksText = page.locator('text=Thank you for your order!');
    // this.LastName = page.locator("#last-name");
    // this.pincode = page.locator("#postal-code");
    // this.continue = page.locator("#continue");

}

async verifyThanksPage()
{
    await this.page.waitForLoadState('networkidle');
    return this.thanksText.textContent();  
}

}
module.exports = {ThanksPage};
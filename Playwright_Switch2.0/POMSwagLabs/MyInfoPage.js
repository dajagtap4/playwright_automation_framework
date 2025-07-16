const {test, expect} = require('@playwright/test');
class MyInfoPage
{
    
constructor(page)
{
    this.page = page;
    this.firstName = page.locator("#first-name");
    this.LastName = page.locator("#last-name");
    this.pincode = page.locator("#postal-code");
    this.continue = page.locator("#continue");

}

async enterInfoAndContinue()
{
    await this.firstName.fill("Deepak");
    await this.LastName.fill("Jagtap");
    await this.pincode.fill("111111");
    await this.continue.click();
    await this.page.waitForTimeout(2000);
}

}
module.exports = {MyInfoPage};
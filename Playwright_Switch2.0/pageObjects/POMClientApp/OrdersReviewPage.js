const { expect } = require("@playwright/test");

class OrdersReviewPage
{
constructor(page)
{
    this.page = page;
this.country = page.locator("[placeholder*='Country']");
this.dropdown = page.locator(".ta-results");
this.emailId = page.locator(".user__name [type='text']").first();
this.submit =  page.locator(".action__submit");
this.orderConfirmationText = page.locator(".hero-primary");
this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

}
async searchCountryAndSelect(countryCode,countryName)
{
    await this.country.pressSequentially("ind");
   // await this.country.fill(countryCode,{delay:100});
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
      const  text =  await this.dropdown.locator("button").nth(i).textContent();
        if(text.trim() === countryName)
        {
           await this.dropdown.locator("button").nth(i).click();
           break;
        }
    }

}

async VerifyEmailId(username)
{
    await expect(this.emailId).toHaveText(username);
}

async SubmitAndGetOrderId()
{
 await this.submit.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 //return await this.orderId.textContent();
 
// use below instead of above if using same user
//  above will work if we work with diff users in utils\placeorderTestData.json

 const orderIdElements = this.page.locator('.em-spacer-1 .ng-star-inserted');
 const count = await orderIdElements.count();

 if (count !== 1) {
  console.warn(`⚠️ Expected 1 order ID, but found ${count}. Using the first one.`);
 }

 return await orderIdElements.first().textContent();

}
}
module.exports = {OrdersReviewPage};
   
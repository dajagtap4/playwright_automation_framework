const {test,expect} = require('@playwright/test');

test("mouse hover",async({page})=>
{
    await page.goto('https://www.amazon.in/ref=nav_logo/')

    const acc_and_list = page.locator("//*[@id='nav-link-accountList-nav-line-1']")
    const your_acc = page.locator("//*[@id='nav-al-your-account']/ul/li[1]/a/span")

    await acc_and_list.hover();
    await your_acc.click();
});
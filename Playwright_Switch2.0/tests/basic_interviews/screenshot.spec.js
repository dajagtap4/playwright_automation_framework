const {test,expect} = require('@playwright/test');

test("take screenshot",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")
   
    await page.screenshot({path:"tests/screenshots/screenshot.png"});
});
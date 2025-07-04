const {test,expect} = require('@playwright/test');

test("double click mouse",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")
   
    await page.locator('//*[@id="HTML10"]/div[1]/button').dblclick();

    const f2 = await page.locator('#field2')
    await expect(f2).toHaveValue('Hello World!')
});
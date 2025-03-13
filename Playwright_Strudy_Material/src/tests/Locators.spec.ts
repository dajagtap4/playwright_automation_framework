import { expect, test } from "@playwright/test";

test('locators',async({page})=>{
    await page.goto("https://www.demoblaze.com/index.html");

    //click on login button
    //await page.locator('id=login2').click();
    await page.click('id=login2');

    //username
    await page.fill('#loginusername', 'pavanol');

     //password
     await page.fill('#loginpassword', 'test@123');

     //click login
     await page.click('//*[@id="logInModal"]/div/div/div[3]/button[2]');

     //verify logout 
     const logoutLink = await page.locator('#logout2');
     await expect(logoutLink).toBeVisible();

})
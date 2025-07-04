   const {test,expect} = require('@playwright/test')

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'});
//https://globallogic.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31110670#overview

test('Hide and Show', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  //check Hide Button visible?
  await expect(page.locator('#hide-textbox')).toBeVisible();
  //Click on the Hide Button 
  await page.locator('#hide-textbox').click();

  await page.waitForTimeout(2000);
  
  // verify box is hidden
  await expect(page.locator('#displayed-text')).toBeHidden();

  //check Show Button visible?
  await expect(page.locator('#show-textbox')).toBeVisible();
  //Click on the show Button 
  await page.locator('#show-textbox').click();

  await page.waitForTimeout(2000);
});

test("@Web All in one package",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // go here and there 
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    //Hide and show
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //stop execution
   // await page.pause();

   // handling popup/prompt
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //mouse hover
    await page.locator("#mousehover").hover();

    //frames
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
     const textCheck =await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})

test("Screenshot & Visual comparision",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});
//screenshot -store -> screenshot -> 
test('visual',async({page})=>
{
    //make payment -when you 0 balance
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})





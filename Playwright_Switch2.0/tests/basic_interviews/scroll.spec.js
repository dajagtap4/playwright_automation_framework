const {test,expect} = require('@playwright/test');

test("Scroll Using page.evaluate()",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")
   
    // Scrolls down by 250px
    await page.evaluate(()=> window.scrollBy(0,250));
    
    await page.waitForTimeout(1000);

    // Scrolls to 500px from the top
    await page.evaluate(()=> window.scrollBy(0,500));

     await page.waitForTimeout(1000);

    //Scroll to the Bottom of the Page
    await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight))

});

test('scroll using "element.scrollIntoViewIfNeeded()" ',async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //scrolling for desired locator
    const element = page.locator('#btn3');
    await element.scrollIntoViewIfNeeded();
});

test("Scrolling with Keyboard Keys",async({page})=>
{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //Simulate Scrolling with Keyboard Keys
    await page.keyboard.press('PageDown'); // Scrolls down by one page
    await page.keyboard.press('ArrowDown'); // Scrolls down by one line
    await page.keyboard.press('End'); // Scrolls to the bottom of the page
});
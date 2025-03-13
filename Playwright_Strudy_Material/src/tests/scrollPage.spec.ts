import {expect, test } from '@playwright/test'

test('scrollPage',async( {page} ) => {

    await page.goto("https://testautomationpractice.blogspot.com/")
//1
    //Scroll Using page.evaluate()
    // Scrolls down by 250px
    await page.evaluate(() => window.scrollBy(0, 250)); // Scrolls down by 250px

    // Scrolls to 500px from the top
    await page.evaluate(() => window.scrollTo(0, 500)); 

    //Scroll to the Bottom of the Page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); 

//2
    //scroll using | element.scrollIntoViewIfNeeded() |
    
    const element = page.locator('#element-id');
    await element.scrollIntoViewIfNeeded(); // Scrolls to make the element visible

//3
    //Simulate Scrolling with Keyboard Keys
    await page.keyboard.press('PageDown'); // Scrolls down by one page
    await page.keyboard.press('ArrowDown'); // Scrolls down by one line
    await page.keyboard.press('End'); // Scrolls to the bottom of the page

});

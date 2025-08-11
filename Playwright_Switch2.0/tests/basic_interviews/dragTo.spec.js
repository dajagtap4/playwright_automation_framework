const { test, expect } = require('@playwright/test');

test('drag functionality', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const point_A = page.locator('//*[@id="draggable"]/p');
    const point_B = page.locator('//*[@id="droppable"]');

    // Scroll to the draggable element if needed
    await point_B.scrollIntoViewIfNeeded();c

    await point_A.dragTo(point_B);

    const title = await page.title();
    const url = await page.url();
    const pageSource = await page.content();

    console.log("Title: ", title);
    console.log("URL: ", url   );
    console.log("Page Source: ", pageSource);
    
    
    
 })
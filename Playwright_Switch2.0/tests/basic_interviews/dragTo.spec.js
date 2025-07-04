const { test, expect } = require('@playwright/test');

test('dropdown handling', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const point_A = await page.locator('//*[@id="draggable"]/p');
    const point_B = await page.locator('//*[@id="droppable"]');

    await point_B.scrollIntoViewIfNeeded();

    await point_A.dragTo(point_B);
 })
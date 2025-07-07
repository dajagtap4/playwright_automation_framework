const { test, expect } = require('@playwright/test');

test('drag functionality', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const point_A = page.locator('//*[@id="draggable"]/p');
    const point_B = page.locator('//*[@id="droppable"]');

    await point_B.scrollIntoViewIfNeeded();

    await point_A.dragTo(point_B);
 })
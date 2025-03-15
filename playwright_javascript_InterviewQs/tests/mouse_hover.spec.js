import { test, expect } from '@playwright/test';
const data = require('../utils/configData.json');
const locator = require('../utils/configLocators.json');

test('Mouse hover example', async ({ page }) => {
    await page.goto(data.blogspot_testurl);

    await page.locator(locator.hover_button).hover();
    await page.locator(locator.hover_button_dropdown).click();
});

import { test, expect } from '@playwright/test'
const data = require('../utils/configData.json');
const loc = require('../utils/configLocators.json');

test('drag to test', async ({ page }) => {
    await page.goto(data.blogspot_testurl)
    await page.locator(loc.drag_locator).dragTo(page.locator(loc.drop_locator));
    await page.close();
});
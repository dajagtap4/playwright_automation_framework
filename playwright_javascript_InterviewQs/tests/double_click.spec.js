import { test, expect } from '@playwright/test';
const data = require('../utils/configData.json');
const locator = require('../utils/configLocators.json');

test('double click example', async ({ page }) => {
    await page.goto(data.blogspot_testurl);

    await page.locator(locator.dbl_click_button).dblclick();
    await expect(page.locator(locator.dbl_click_input_value)).toHaveValue(data.dbl_click_expected_input_value);
});

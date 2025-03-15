import { test, expect } from '@playwright/test';
const data = require('../utils/configData.json');
const locator = require('../utils/configLocators.json');

test('keyboard actions', async ({ page }) => {
    await page.goto(data.keyboard_actions_testurl);

    await page.evaluate(() => window.scrollTo(0, 400));

    await page.waitForTimeout(500);

    await page.locator(locator.keyboard_actions_first_input_field).click();

    await page.locator(locator.keyboard_actions_first_input_field).fill(data.keyword_actions_demo_text);
    await page.waitForTimeout(500);

    await page.keyboard.press('Control+A');
    await page.waitForTimeout(500);

    await page.keyboard.press('Control+C');
    await page.waitForTimeout(500);

    await page.keyboard.down('Tab');
    await page.keyboard.up('Tab');

    await page.keyboard.press('Control+V');
    await page.waitForTimeout(500);

    await page.keyboard.down('Shift');
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyC');
    await page.keyboard.up('Shift');
    await page.waitForTimeout(500);

    await page.keyboard.press('KeyB');
    await page.keyboard.press('KeyD');

    await page.keyboard.press('Home')       // go to top from bottom or from any location
    await page.keyboard.press('PageDown');  // Scrolls down by one page
    await page.keyboard.press('ArrowDown'); // Scrolls down by one line
    await page.keyboard.press('End');       // Scrolls to the bottom of the page

    await page.waitForTimeout(500);
    await page.close();
});

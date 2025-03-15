import { test, expect } from '@playwright/test';
const data = require('../utils/configData.json');
const locator = require('../utils/configLocators.json');

test('Handling iframe using frameLocator', async ({ page }) => {
    await page.goto(data.frames_testurl);

    await page.frameLocator(locator.frame_locator).locator(locator.input_locator).fill(data.username);
    await expect(page.frameLocator(locator.frame_locator).locator(locator.input_locator)).toHaveValue(data.username);

    await page.close();
});

//For multiple frames, use page.frames() to get all frames.

//const frames = page.frames();
// Interact with the second frame
//await frames[1].locator('button').click();
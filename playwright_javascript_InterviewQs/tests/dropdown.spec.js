import { test, expect } from '@playwright/test';

test('dropddown test', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //label and visible text
    await page.locator('#country').selectOption({ label: 'Canada' });

    //visible text
    await page.locator('#country').selectOption('India');

    //by value
    await page.locator('#country').selectOption({ value: 'uk' });

    //index
    await page.locator('#country').selectOption({ index: 4 });

    //hybrid
    await page.selectOption("#country", 'China');
})
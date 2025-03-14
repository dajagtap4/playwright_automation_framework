import { test, expect, page, chromium } from '@playwright/test'

test('TC 001, Check if an element is visible', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect(page.locator('//*[@id="Blog1"]/div[1]/div/div/div/div/h3/a')).toBeVisible();
})

test('TC 002, Check if an element contains text', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect(page.locator('//*[@id="Blog1"]/div[1]/div/div/div/div/h3/a')).toHaveText('GUI Elements');
})

test('TC 003, Check if an element contains a specific attribute', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    await expect(page.locator('#name')).toHaveAttribute('placeholder','Enter Name');
})
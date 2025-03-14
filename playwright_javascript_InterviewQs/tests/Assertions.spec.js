import { test, expect, chromium } from '@playwright/test'
import { describe } from 'node:test'

test.describe('assertions in playwright with diff. methods', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
    })
    test('TC 001, Check if an element is visible', async ({ page }) => {
        await expect(page.locator('//*[@id="Blog1"]/div[1]/div/div/div/div/h3/a')).toBeVisible();
    })

    test('TC 002, Check if an element contains text @runOnlyThis ', async ({ page }) => {
        await expect(page.locator('//*[@id="Blog1"]/div[1]/div/div/div/div/h3/a')).toHaveText('GUI Elements');
    })

    test('TC 003, Check if an element contains a specific attribute', async ({ page }) => {
        await expect(page.locator('#name')).toHaveAttribute('placeholder', 'Enter Name');
    })

    test('TC 004, Check if an element is enabled or disabled', async ({ page }) => {
        await expect(page.locator('//*[@id="confirmBtn"]')).toBeEnabled();
        //will fail because button is not Disabled
        await expect.soft(page.locator('//*[@id="confirmBtn"]')).toBeDisabled();

        const isEnabled = await page.locator('//*[@id="confirmBtn"]').isEnabled();
        const isDisabled = await page.locator('//*[@id="confirmBtn"]').isDisabled();
    })

    test('TC 005, Check if the page title is correct @runOnlyThis', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Testing Practice');
    })

    test('TC 006, Check if a checkbox is checked', async ({ page }) => {
        await page.click("#sunday");
        await expect(page.locator('#sunday')).toBeChecked()
    })
})
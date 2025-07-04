const { test, expect } = require('@playwright/test');

test('dropdown handling', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.selectOption('#country', {label: 'United Kingdom'}); // by visible text

    await page.selectOption('#country', {index: 7}); // by position

    await page.selectOption('#country', 'france');  // by value
 });
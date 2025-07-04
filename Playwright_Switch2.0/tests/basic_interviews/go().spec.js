const { test, expect } = require('@playwright/test');

test('Go here and there', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await page.goto("http://google.com");

  await page.goBack();

  await page.waitForTimeout(500);

  await page.goForward();

  await page.waitForTimeout(500);
}); 
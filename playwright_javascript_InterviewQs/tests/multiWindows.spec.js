import { test, expect, chromium } from '@playwright/test';

test('handling multi windows', async ({ page }) => {

  const browser = await chromium.launch()
  const context = await browser.newContext()
  const  page1  = await context.newPage()

  await page1.goto("https://demo.automationtesting.in/Windows.html");
  await expect(page1).toHaveTitle("Frames & windows")

  const pagePromise = context.waitForEvent('page')
  await page1.locator('//*[@id="Tabbed"]/a/button').click()

  const newPage = await pagePromise;
  await expect(newPage).toHaveTitle("Selenium")
  await newPage.locator('//*[@id="main_navbar"]/ul/li[2]/a').click();
});
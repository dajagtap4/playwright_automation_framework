import { test, expect } from '@playwright/test';
import { url } from 'inspector';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);

  //soft assertion, will not terminate excecution 
  await expect.soft(page).toHaveURL("https://playwright.dev/")
  
  await expect(page.locator('//*[@id="__docusaurus"]/nav/div[1]/div[1]/a[1]/b')).toBeVisible()
});

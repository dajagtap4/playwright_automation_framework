import { test, expect, chromium } from '@playwright/test';

test('multi windows handles', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1 = await context.newPage();

  //at page 1 (homepage)
  await page1.goto("https://demo.automationtesting.in/Windows.html" );
  await expect(page1).toHaveTitle("Frames & windows");
  //new page will open but control still on page 1 
  await page1.locator('//*[@id="Tabbed"]/a/button').click(); 

  // control will shift to new page (second page | page 2)
  const newPage = await context.waitForEvent('page');
  await expect(newPage).toHaveTitle("Selenium");

  //------------------------------------------------
  
  //19:navigating to page 1 | 20:control shoft to page 1
  await newPage.goBack();
  await page1.bringToFront();

  //click to open new page (page 3)
  await page1.locator('//*[@id="Tabbed"]/a/button').click(); 
  // control will shift to new page (thirs page | page 3)
  const newPage2 = await context.waitForEvent('page');
  await expect(newPage2).toHaveTitle("Selenium");
});


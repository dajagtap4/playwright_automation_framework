const {test,expect} = require('@playwright/test');

test('assertion', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

//   const currentUrl = page.url(); // <- this returns a string, not a Promise
//   const expectedUrl = "https://rahulshettyacademy.com/client";

//   const result = currentUrl === expectedUrl;
//   console.log(result); // Will print true
});


test('check URL contains expected path', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');

  // Assert the current URL exactly matches
  await expect(page).toHaveURL('https://rahulshettyacademy.com/client');
});

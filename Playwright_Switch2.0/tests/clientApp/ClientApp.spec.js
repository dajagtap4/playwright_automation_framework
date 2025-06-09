const {test,expect} = require('@playwright/test');

test('@Web print first iteam from product page', async ({ page }) => {
    const email = "anshika@gmail.com";
    const expectedFirstItem = 'zara coat 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamkig@000");
    await page.locator("[value='Login']").click();

    // Playwright.dev suggested that below line may not work every time 
    await page.waitForLoadState('networkidle');
    // Use below instead of above
    //await page.locator(".card-body b").last().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
    const actualFirstItem = await page.locator(".card-body b").nth(0).textContent();
    //const actualFirstItem = await page.locator(".card-body b").first().textContent();  // Alternate Method
    expect(actualFirstItem?.trim().toLowerCase()).toBe(expectedFirstItem.toLowerCase());
 })
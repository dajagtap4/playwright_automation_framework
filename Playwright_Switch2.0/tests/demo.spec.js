 const {test, expect} = require('@playwright/test');

test('search product in flipkart', async ({page})=> {

    await page.goto('https://www.flipkart.com/');

    await page.locator('//input[@class="Pke_EE"]').fill('iphone 13');
    //await page.locator('//button[@class="bJtikv"]').click();
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    expect(await page.locator('//div[text()="Apple iPhone 13 (Starlight, 128 GB)"]').isVisible()).toBeTruthy();
    expect(await page.locator('//div[text()="Apple iPhone 13 (Midnight, 128 GB)"]').textContent()).toContain('Apple iPhone 13 (Midnight, 128 GB)');

});

test('test 2', async ({page})=> {

    await page.goto('https://www.flipkart.com/');

   // await page.locator('//a[@class="_1jKL3b"]').click();
   await page.locator('//div[@class="_1wE2Px"]').click();

   await page.locator('//div[@class="_16rZTH"]/object/a[2]').hover();

   await page.locator('//div[@class="_31z7R_"]/object/a[2]').click();
   

});
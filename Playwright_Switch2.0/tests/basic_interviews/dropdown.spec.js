const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
});

test('dropdown handling @dropdown', async ({ page }) => {

    //await page.goto("https://testautomationpractice.blogspot.com/");

    await page.selectOption('#country', {label: 'United Kingdom'}); // by visible text

    await page.selectOption('#country', {index: 7}); // by position
    
    await page.selectOption('#country', 'france');  // by value

    await page.close();
 });

 test('dropdown with scroll @dropdown', async ({ page }) => {

    //await page.goto("https://testautomationpractice.blogspot.com/");

    const element = page.locator('#country');
    await element.scrollIntoViewIfNeeded();

    await page.selectOption('#country', {index:4});

 });

 test('check number of options in dropdown',async( { page }) => {

    //Approch 1 : 
    const options = page.locator("#country option");
    const count = await options.count();
    await expect(options).toHaveCount(10);
    console.log("Number of options in dropdown: " + count);
 });

 test('check India option present in dropdown',async( { page }) => {

    //Assertion
    const content= await page.locator('#country').textContent()
    expect(content?.includes('India') || false).toBeTruthy()  //pass
    expect(content?.includes('Ind') || false).toBeTruthy()    //pass
    expect(content?.includes('dia') || false).toBeTruthy()    //pass
    //expect(content?.includes('deepak') || false).toBeTruthy() //fails

 })
 
 //after each close page
 test.afterEach(async ({ page }) => {
    await page.close();
 });
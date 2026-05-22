// import exp from "constants";
// import { TIMEOUT } from "dns/promises";
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
});

//-----------------------------------------------------------------------------

test('dropdown test', async ({ page }) => {

    // label or visible text
    await page.locator('#country').selectOption({ label: 'Canada' });

    await page.waitForTimeout(1000);

    // visible text
    await page.locator('#country').selectOption('India');

    await page.waitForTimeout(1000);

    // by value
    await page.locator('#country').selectOption({ value: 'uk' });

    await page.waitForTimeout(1000);

    // by index
    await page.locator('#country').selectOption({ index: 4 });

    await page.waitForTimeout(1000);

    // direct method
    await page.selectOption("#country", 'China');
});

 test('check number of options in dropdown',async( { page }) => {

    //Approch 1 : 
    const options = await page.locator("#country option");
    await expect(options).toHaveCount(10);

    await page.waitForTimeout(1000)

    //Approch 2 :
    const options2 = await page.$$("#country option");
    //console.log("Nu of options :", options2.length)
    await expect(options2.length).toBe(10)
 })


 test('Approch 1: check India option present in dropdown',async( { page }) => {

    //Assertion
    const content= await page.locator('#country').textContent()
    await expect(content?.includes('India') || false).toBeTruthy()  //pass
    await expect(content?.includes('Ind') || false).toBeTruthy()    //pass
    await expect(content?.includes('dia') || false).toBeTruthy()    //pass
    //await expect(content?.includes('deepak') || false).toBeTruthy() //fails

 })

 test('Approch 2 - loop : check "Brazil" option present in dropdown',async( { page }) => {

    //Assertion
    const options = await page.$$("#country")
    let status = false;
     
    for(const option of options){
        console.log(await option.textContent())

        let value=await option.textContent()
        if(value?.includes("Brazil")){
            status=true;
            break;
        }
    }
        expect(status).toBeTruthy()
 })

 test('Select option "Brazil" from dropdown using loop',async( { page }) => {

    //Assertion
    const options = await page.$$("#country option")
     
    for(const option of options){

        let value=await option.textContent()
        if(value?.includes("Brazil")){
            await page.selectOption("#country", value || "")
            break;
        }
    }
 })

//-------------------------------------------
 test.afterEach(async( { page }) => {
    await page.waitForTimeout(1000)
})

test.afterAll(async( { page }) => {
    await page.close();
})
import { expect, test } from "@playwright/test";
import exp from "constants";
import { TIMEOUT } from "dns/promises";

test.beforeEach(async( { page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
})
//-----------------------------------------------------------------------------


test('label or visible text',async( { page }) => {

   await page.locator('#country').selectOption({label: 'Canada'});

})

test('visible text',async( { page }) => {
 
    await page.locator('#country').selectOption('India');

})

test('by passing value',async( { page }) => {

    await page.locator('#country').selectOption({value: 'uk'});
 
 })


 test('by passing index',async( { page }) => {

    await page.locator('#country').selectOption({index: 4});
 
 })

 test('dropdown option',async( { page }) => {

    await page.selectOption("#country", 'China');
 
 })

 test('Approch 1 : check number of options in dropdown',async( { page }) => {

    //Assertion
    const options = await page.locator("#country option");
    await expect(options).toHaveCount(10);
 })

 test('Approch 2 : check number of options in dropdown',async( { page }) => {

    //Assertion
    const options = await page.$$("#country option");
    console.log("Nu of options :", options.length)
    await expect(options.length).toBe(10)
 })

 test('Approch 1: check "India" option present in dropdown',async( { page }) => {

    //Assertion
    const content= await page.locator('#country').textContent()
    await expect(content.includes('India')).toBeTruthy()  //pass
    await expect(content.includes('Ind')).toBeTruthy()    //pass
    await expect(content.includes('dia')).toBeTruthy()    //pass
    await expect(content.includes('deepak')).toBeTruthy() //fails

 })

 test('Approch 2 - loop : check "Brazil" option present in dropdown',async( { page }) => {

    //Assertion
    const options = await page.$$("#country option")
    let status = false;
     
    for(const option of options){
        console.log(await option.textContent())

        let value=await option.textContent()
        if(value.includes("Brazil")){
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
        if(value.includes("Brazil")){
            await page.selectOption("#country", value)
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
import { expect, test } from "@playwright/test";
import exp from "constants";
import { TIMEOUT } from "dns/promises";

test.beforeEach(async( { page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
})

//-----------------------------------------------------------------------------


test('test',async( { page }) => {

    //label or visible text
    await page.locator('#country').selectOption({label: 'Canada'});

    await page.waitForTimeout(1000)

    //visible text
    await page.locator('#country').selectOption('India');

    await page.waitForTimeout(1000)

    //by passing value
    await page.locator('#country').selectOption({value: 'uk'});
 
    await page.waitForTimeout(1000)

    //by passing index
    await page.locator('#country').selectOption({index: 4});
 
    await page.waitForTimeout(1000)

    //dropdown option
    await page.selectOption("#country", 'China');
 
 })

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
    const options = await page.$$("#country")
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
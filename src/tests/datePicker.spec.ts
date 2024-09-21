import {test} from '@playwright/test'

test.beforeEach(async( { page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
})
//-----------------------------------------------------------------------------



test('while loop datePicker',async({page})=> {

    const year = "2023"
    const month = "February"
    const date = "20"
    
    await page.click("#datepicker")

    while(true){
        const currentYear = await page.locator('.ui-datepicker-year').textContent();
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();

        if(currentYear == year && currentMonth == month){
            break;
        }
        await page.locator('[title="Prev"]').click()
    }

    const dates = await page.$$(".ui-state-default")

    for(const dt of dates){

        if(await dt.textContent() == date){
            await dt.click();
            break;
        }
    }
})

test('without for loop datePicker',async({page})=> {

    const year = "2023"
    const month = "February"
    const date = "20"
    
    await page.click("#datepicker")

    while(true){
        const currentYear = await page.locator('.ui-datepicker-year').textContent();
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();

        if(currentYear == year && currentMonth == month){
            break;
        }
        await page.locator('[title="Prev"]').click()
    }

    await page.click(`//a[@class='ui-state-default'][text()='${date}']`)

})

test('simplest way to datepickerr',async({page})=> {

await page.fill('#datepicker','03/15/2023')

})




//-------------------------------------------
test.afterEach(async( { page }) => {
    await page.waitForTimeout(1000)
})

test.afterAll(async( { page }) => {
    await page.close();
})
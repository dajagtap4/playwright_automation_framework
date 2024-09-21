import {test} from '@playwright/test'

test('datePicker',async({page})=> {
    await page.goto("https://testautomationpractice.blogspot.com/");

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

    await page.waitForTimeout(2000)
    await page.close()
})
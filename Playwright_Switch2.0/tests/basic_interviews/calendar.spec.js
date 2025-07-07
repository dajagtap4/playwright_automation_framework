const {test,expect} = require("@playwright/test");

test("Calendar",async({page})=>
{
    const monthNumber = "6";
    const date = "15";
    const year = "2020";
    const expectedList = [monthNumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    let yearFound = false;
    while(!yearFound)
    {
        const yearsTiles =  page.locator(".react-calendar__tile.react-calendar__decade-view__years__year");
        const count = await yearsTiles.count();

        for(let i=0;i<count;i++)
        {
            const yearText = await yearsTiles.nth(i).textContent();
            if(yearText === year)
            {
                await yearsTiles.nth(i).click();
                yearFound = true;
                break;
            }
        }

        if(!yearFound)
            {
                // Check first and last year in the visible decade to decide direction
                const firstYear = await yearsTiles.nth(0).textContent();
                const lastYear = await yearsTiles.nth(count - 1).textContent();

                if(year < firstYear ){
                    await page.locator(".react-calendar__navigation__prev-button").click();
                } else if(year > lastYear){
                    await page.locator(".react-calendar__navigation__next-button").click();
                } else {
                    throw new Error(`Year ${year} not found in visible decade range`);
                }      
            }
    }
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber-1).click();
    await page.locator(`//abbr[text()=${date}]`).click();

    const inputs = page.locator(".react-date-picker__inputGroup input");
        for (let i = 0; i <inputs.length; i++)
        {
            const value =inputs[i].getAttribute("value");
            expect(value).toEqual(expectedList[i]);
        }
});
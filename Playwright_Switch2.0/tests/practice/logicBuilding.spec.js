const { test, expect } = require('@playwright/test');

//Search iphone -> add to cart (Lowest price).
test('LogicBuilding_1', async ({ page }) => {

    await page.goto("https://www.amazon.in/");

    await page.locator("#twotabsearchtextbox").fill("iphone");
    await page.click("#nav-search-submit-button");

    await page.waitForSelector('.puisg-row.puis-desktop-list-row', { timeout: 10000 });

    const priceLocator = page.locator(".puisg-row.puis-desktop-list-row");
    const count = await priceLocator.count();   
    
    // Logic to find and click the lowest price iPhone
    let minPrice = Number.MAX_VALUE;
    let minIndex = -1;

    for (let i = 0; i < count; i++) {
        const priceText  = await priceLocator.locator(' div div div div div a span span span:nth-of-type(2)')
                            .nth(i).textContent();
        const cleanPrice = priceText?.replace(/[^0-9]/g, '');  
        const priceValue = parseInt(cleanPrice);  

        // priceText  = "₹1,34,900"
        // cleanPrice = "134900"
        // priceValue = 134900
    
        if (priceValue < minPrice) {
            minPrice = priceValue;
            minIndex = i;
        }
    }

    console.log(`🟢 Lowest price found: ₹${minPrice} at index ${minIndex}`);

    if (minIndex !== -1) {
        await priceLocator.locator('.a-button-text').nth(minIndex).click();
        console.log("🛒 Clicked 'Add to Cart' for lowest priced iPhone.");
    }
});

// Rahul shetty website -> login -> Add to cart
test('LogicBuilding_2', async ({ page }) => {
    const email = "jagtapda2019@gmail.com";
    const expectedFirstItem = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Deepak@1994");
    await page.locator("[value='Login']").click();

    const products = page.locator(".card-body");
    const count = await products.count();

    for(let i=0;i<count;i++)
    {
        const productText = await products.nth(i).locator('h5 b').textContent();
        if(productText === expectedFirstItem)
        {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
});

// DatePicket/Calendar
test('LogicBuilding_3', async ({ page }) => {

    await page.goto("https://jqueryui.com/datepicker/");

    const date = "20";
    const month = "February";
    const year = 2020;

   const months = [               
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const frame = page.frameLocator(".demo-frame");
    await frame.locator("#datepicker").click();

    let found = false;
    while(!found)
    {
            const yearText = await frame.locator(".ui-datepicker-year").textContent();
            const yearNumber = parseInt(yearText?.trim() || "0");
            const monthText = await frame.locator(".ui-datepicker-month").textContent();
            const currentMonthIndex = months.indexOf(monthText);
            const targetMonthIndex = months.indexOf(month);

            if(yearNumber === year && monthText === month)
            {
                const dateLocator = frame.locator("tbody tr td");
                const count = await dateLocator.count();

                for(let i=0;i<count;i++)
                {
                    const dateText = await dateLocator.nth(i).textContent();

                    if(dateText === date)
                    {
                        await dateLocator.nth(i).click();
                        found = true;
                        break;
                    }
                }
            } 

            else if(!found)
            {
                if(year < yearNumber || (yearNumber === year && currentMonthIndex > targetMonthIndex))
                {
                    await frame.locator(".ui-datepicker-prev.ui-corner-all").click();
                }

                else if(year > yearNumber || (yearNumber === year && currentMonthIndex < targetMonthIndex))
                {
                    await frame.locator(".ui-icon.ui-icon-circle-triangle-e").click();
                }
            }   
    }
});

// verify expected text "Liechtenstein" is display in table.
test("LogicBuilding_4",async({page})=>
{
    await page.goto("https://cosmocode.io/automation-practice-webtable");

    const tableTiles = page.locator('#countries tbody tr td');
    const count = await tableTiles.count();
    console.log(`Total tile count is - ${count}`);

    const expectedText = "Liechtenstein";

    for(let i=0;i<count;i++){
        const tableText = await tableTiles.nth(i).textContent();
        if(tableText===expectedText){
            console.log('Expected text and actual is matching');
            console.log(`Actual tile text is - ${tableText}`);
            break;
        }
    }
});

test("LogicBuilding_5",async({page})=>
{
    await page.goto("https://www.hyrtutorials.com/p/add-padding-to-containers.html");

    const expectedText = "Yoshi Tannamuri";  //***if = "5000";

    //locator of all rows 
    const rows =  page.locator('#contactList tbody tr');
    const count = await rows.count();

    for(let i=0;i<count;i++){
        const allTextContainInRow = await rows.nth(i).textContent();

        if(allTextContainInRow?.includes(expectedText)) //***then allTextContainInRow === expectedText 
        {
            await rows.nth(i).locator('td input').click();
            console.log(`✅ Clicked checkbox in row ${i}`);
            break; //***then break should be remove.
        }
        else{
            console.log(`❌ Row ${i} does not contain "${expectedText}".`);
        }
    }
});

const { test, expect } = require('@playwright/test');

//Search iphone
//click on add to cart which has Lowest price.
test('LogicBuilding_1', async ({ page }) => {

    await page.goto("https://www.amazon.in/");

    await page.locator("#twotabsearchtextbox").fill("iphone");
    await page.click("#nav-search-submit-button");

    await page.waitForSelector('.puisg-row.puis-desktop-list-row', { timeout: 10000 });

    const priceLocator = page.locator(".puisg-row.puis-desktop-list-row");
    const count = await priceLocator.count();

    // for(let i=0; i<count; i++)
    // {
    //     const priceText = await priceLocator.locator(' div div div div div a span span span:nth-of-type(2)').nth(i).textContent();
    //     console.log(priceText.trim());

    //     if(priceText==="1,34,900"){
    //         await priceLocator.locator(" .a-button-text").nth(i).click();
    //     }
    // }    
    
    // Logic to find and click the lowest price iPhone
    let minPrice = Number.MAX_VALUE;
    let minIndex = -1;

    for (let i = 0; i < count; i++) {
        const priceText = await priceLocator.locator(' div div div div div a span span span:nth-of-type(2)').nth(i).textContent();
        const cleanPrice = priceText?.replace(/[^0-9]/g, ''); //price as a string containing only digits (e.g., "60300").
        const priceValue = parseInt(cleanPrice); //price as an integer (number) (e.g., 60300).
       
        if (!isNaN(priceValue) && priceValue < minPrice) {
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
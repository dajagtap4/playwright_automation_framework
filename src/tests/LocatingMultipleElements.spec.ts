import { expect, test } from "@playwright/test";

test('multilocators',async({page})=>{
    await page.goto("https://www.demoblaze.com/index.html");

    const links = await page.$$('a');
    for(const link of links ){
        const linkText = await link.textContent();
        console.log(linkText);
    }

    const products = await page.$$("//div[@id='tbodyid']//h4/a")
    for(const product of products ){
        const productName = await product.textContent();
        console.log(productName);
    }
})
const {test,expect} = require("@playwright/test");

test("table",async({page})=>
{
    await page.goto("https://cosmocode.io/automation-practice-webtable");

    const tableTiles = page.locator('#countries tbody tr td');
    const count = await tableTiles.count();
    console.log(count);

    const expectedText = "Liechtenstein";

    for(let i=0;i<count;i++){
        const tableText = await tableTiles.nth(i).textContent();
        if(tableText===expectedText){
            console.log(tableText)
        }
    }
});

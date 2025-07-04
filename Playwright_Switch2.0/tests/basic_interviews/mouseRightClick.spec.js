const {test,expect} = require('@playwright/test');

test("double click mouse",async({page})=>
{
    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html')

    await page.locator("//div[@class='document']/p/span").click({button: 'right'});

});
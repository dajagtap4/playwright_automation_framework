const {test,expect} = require("@playwright/test");

test("Frame Handling 1",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    await page.frameLocator("#courses-iframe").locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await page.frameLocator("#courses-iframe").locator(".text h2").textContent();

    console.log(textCheck);
    console.log(textCheck.split(" ")[0]);
    console.log(textCheck.split(" ")[1]);
    console.log(textCheck.split(" ")[2]);
})

test('Frame Handling 2',async ({page}) => {
    
    await page.goto('https://demo.automationtesting.in/Frames.html')
    
    await page.frameLocator('#singleframe').locator('[type="text"]').first().fill("Deepak");
})
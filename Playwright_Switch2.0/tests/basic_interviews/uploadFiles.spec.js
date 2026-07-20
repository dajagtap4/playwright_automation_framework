const {test,expect} = require('@playwright/test');

test("verify file upload",async({page})=>
{
    await page.goto('https://demo.automationtesting.in/FileUpload.html');
    const filePath = "C:/Users/Deepak/Desktop/projects/playwright_automation_framework/Playwright_Switch2.0/uploadfiledata/abc.jpeg";
    await page.setInputFiles("#input-4",filePath)
    await page.waitForTimeout(2000);
});

const { test, expect } = require('@playwright/test');
const credSet = JSON.parse(JSON.stringify(require("./creds.json")));
const path = require('path');

for(const cred of credSet)
{
  test(`update resume on naukari for account ${cred.accName}`, async ({ page }) => 
  {
    await page.goto("https://www.naukri.com/");
    await page.waitForLoadState('networkidle');

    //login
    await page.locator("#login_Layer").click();
    await page.waitForLoadState('networkidle');

    await page.locator("[name=login-form]>div:nth-child(2)>input").fill(cred.username);
    await page.locator("[name=login-form]>div:nth-child(3)>input").fill(cred.password);
    await page.locator(".btn-primary.loginButton").click();
    await page.waitForLoadState('networkidle');
    
    // verify login with url
    await page.waitForURL('https://www.naukri.com/mnjuser/homepage', { timeout: 10000 });
    expect(page.url()).toContain("https://www.naukri.com/mnjuser/homepage");

    // navigate to profile
    await page.locator("img[alt='naukri user profile img']").click();
    //await page.waitForLoadState('networkidle');

    await page.locator('text=View & Update Profile').click();
    //await page.waitForLoadState('networkidle');

    // Correct relative path
    const filePath = path.resolve(__dirname, './resume/QA_DeepakJ_Resume.pdf');

    // Listen for file chooser event
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('input[value="Update resume"]'), // Triggers the file chooser
    ]);

    // Set the PDF file to the file chooser
    await fileChooser.setFiles(filePath);

    //verify resume uploaded.
    const message = page.locator('text=Resume has been successfully uploaded.');
    await expect(message).toBeVisible();

    // navigate to profile
    await page.locator("img[alt='naukri user profile img']").click();

    // logout
    await expect(page.getByText('Logout')).toBeVisible();
    await page.locator('text=Logout').click();
    
    // verify logout with url
    expect(page.url()).toContain("https://www.naukri.com/");

    const istTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    console.log(`🕒[${istTime}] ✅ Resume updated for < ${cred.accName} > account`);

    await page.close();
  });
}
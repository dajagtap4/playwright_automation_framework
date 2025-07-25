# Test info

- Name: update resume on naukari for account Primary
- Location: C:\Users\Deepak\Desktop\projects\playwright_automation_framework\Playwright_Switch2.0\tests\naukari\naukari.spec.js:6:3

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('text=View & Update Profile')

    at C:\Users\Deepak\Desktop\projects\playwright_automation_framework\Playwright_Switch2.0\tests\naukari\naukari.spec.js:29:54
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const credSet = JSON.parse(JSON.stringify(require("./creds.json")));
   3 |
   4 | for(const cred of credSet)
   5 | {
   6 |   test(`update resume on naukari for account ${cred.accName}`, async ({ page }) => 
   7 |   {
   8 |
   9 |     await page.goto("https://www.naukri.com/");
  10 |     await page.waitForLoadState('networkidle');
  11 |
  12 |     //login
  13 |     await page.locator("#login_Layer").click();
  14 |     await page.waitForLoadState('networkidle');
  15 |
  16 |     await page.locator("[name=login-form]>div:nth-child(2)>input").fill(cred.username);
  17 |     await page.locator("[name=login-form]>div:nth-child(3)>input").fill(cred.password);
  18 |     await page.locator(".btn-primary.loginButton").click();
  19 |     await page.waitForLoadState('networkidle');
  20 |     
  21 |     // verify login with url
  22 |     await page.waitForURL('https://www.naukri.com/mnjuser/homepage', { timeout: 10000 });
  23 |     expect(page.url()).toContain("https://www.naukri.com/mnjuser/homepage");
  24 |
  25 |     // navigate to profile
  26 |     await page.locator("img[alt='naukri user profile img']").click();
  27 |     await page.waitForLoadState('networkidle');
  28 |
> 29 |     await page.locator('text=View & Update Profile').click();
     |                                                      ^ Error: locator.click: Target page, context or browser has been closed
  30 |     await page.waitForLoadState('networkidle');
  31 |
  32 |     // update resume
  33 |     await page.locator('.dummyUpload.typ-14Bold').setInputFiles('tests/naukari/resume/QA_DeepakJ_Resume.pdf')
  34 |     //verify resume uploaded.
  35 |     const message = page.locator('text=Resume has been successfully uploaded.');
  36 |     await expect(message).toBeVisible();
  37 |
  38 |     // navigate to profile
  39 |     await page.locator("img[alt='naukri user profile img']").click();
  40 |     await page.waitForLoadState('networkidle');
  41 |
  42 |     await expect(page.getByText('Logout')).toBeVisible();
  43 |     // logout
  44 |     await page.locator('text=Logout').click();
  45 |     await page.waitForLoadState('networkidle');
  46 |     // verify logout with url
  47 |     expect(page.url()).toContain("https://www.naukri.com/");
  48 |
  49 |   });
  50 |
  51 | }
```
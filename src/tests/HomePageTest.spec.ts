import { expect, test } from "@playwright/test";

test('Home page',async({page})=>{
    await page.goto("https://www.demoblaze.com/index.html");

    const pageTitle = page.title();
    console.log('page title is ', pageTitle)

    const pageURL=page.url();
    console.log('page url is ', pageURL)

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle('STORE');

    page.close();
})
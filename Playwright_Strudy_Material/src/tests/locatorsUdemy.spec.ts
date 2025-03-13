import {  test } from "@playwright/test";

test.beforeEach(async( { page }) => {
    await page.goto('https://demo.automationtesting.in/Register.html')
})

test('locators',async( { page }) => {

    //by tag name
    await page.locator('input').first().fill("deepak")

    //by class name 
    await page.locator('[placeholder="Last Name"]').fill("abc")

    //by id, class, attribute(placeholder)
})

test('user facing locators',async( { page }) => {

    //await page.getByRole('button', {name: "Submit"}).click()

    //await page.getByLabel('Adress'). fill("abc")

    //await page.getByPlaceholder('Adress'). fill("abc")

    //await page.getByText('Address'). fill("abc")
})
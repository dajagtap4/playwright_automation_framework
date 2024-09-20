/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

import { expect, test } from "@playwright/test";

test('built-inLocators',async({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //getByAltText
    const logo = await page.getByAltText('company-branding')
    await expect(logo).toBeVisible();

    //getByPlaceholder
    await page.getByPlaceholder('Username').fill("Admin")
    await page.getByPlaceholder('Password').fill("admin123")

    //getByRole
    await page.getByRole('button', { type: 'submit'} ).click()

    //getByText
    const name = await page.locator('//*[@id="app"]/div[1]/div[100]/aside/nav/div[2]/ul/li[1]/a/span').textContent()
    await expect(page.getByText(name)).toBeVisible()


})
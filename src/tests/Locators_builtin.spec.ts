/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

import { test, expect } from '@playwright/test';
import { url } from 'inspector';

test('has title', async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");


  //getByTitle
  //<span title='Issues count'>25 issues</span>
  //await expect(page.getByTitle('Issues count')).toHaveText('25 issues');

  //getByTestId
  //<button data-testid="directions">Itinéraire</button>
  //await page.getByTestId('directions').click();

  //getByAltText
  const logo = await page.getByAltText('company-branding')
  await expect(logo).toBeVisible();

  //getByText
  await expect(page.getByText('Username : Admin')).toBeVisible();
  await expect(page.getByText('Password : admin123')).toBeVisible();

  //getByPlaceholder
  await page.getByPlaceholder('Username').fill("Admin")
  await page.getByPlaceholder('Password').fill("admin123")

  //getByLabel
  // <label data-v-30ff22b1="" data-v-957b4417="" class="oxd-label">Password</label>
  const labelPass = await page.getByLabel('Password')
  await expect(labelPass).toBeTruthy()

  //getByRole
  //<button  type="submit" class="oxd-button"><!----> Login <!----></button>
  await page.getByRole('button', { name:  "Login" }).click();
  
});

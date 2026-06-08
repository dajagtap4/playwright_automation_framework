import { test as base } from '@playwright/test';
import { loginPage } from '../demoblaze-pom/loginPgae';
import { homePage } from '../demoblaze-pom/homePage';
import { cartPage } from '../demoblaze-pom/cartPage';
import { placeOdrForm } from '../demoblaze-pom/placeOdrForm';
import { logoutPage } from '../demoblaze-pom/logoutPage';

type MyFixtures = {
  loginP: loginPage;
  homeP: homePage;
  cartP:cartPage;
  placeOdrFormP : placeOdrForm;
  logoutPageP: logoutPage;
};

export const test = base.extend<MyFixtures>({
  loginP: async ({ page }, use) => {
    await use(new loginPage(page));
  },

  homeP:async ({page},use)=>{
    await use(new homePage(page));
  },

  cartP:async ({page},use)=>{
    await use(new cartPage(page));
  },

    placeOdrFormP:async ({page},use)=>{
    await use(new placeOdrForm(page));
  },

   logoutPageP:async ({page},use)=>{
    await use(new logoutPage(page));
  },
});

export { expect } from '@playwright/test';
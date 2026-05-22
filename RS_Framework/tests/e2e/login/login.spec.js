
const { test, expect } = require('../../../src/fixtures/test.fixture');


test.describe('@regression @login Login flows', () => {
 test.beforeEach(async ({ pages }) => {
   await pages.loginPage.goto();
 });


 test('@smoke TC-LOGIN-001: Valid credentials land on dashboard', async ({ pages, appConfig }) => {
   const { loginPage, dashboardPage } = pages;
   const { username, password } = appConfig.defaultUser;


   await expect(loginPage.usernameInput, 'Email input should be visible on load').toBeVisible();
   await expect(loginPage.passwordInput, 'Password input should be visible on load').toBeVisible();
   await expect(loginPage.page, 'Should start on the login route').toHaveURL(/\/auth\/login/);


   await loginPage.login(username, password);


   await expect(loginPage.page, 'Should redirect to dashboard after login').toHaveURL(/\/dashboard/);
   await expect(
     dashboardPage.productCards.first(),
     'Dashboard should render at least one product card',
   ).toBeVisible();
   await expect(loginPage.errorMessage, 'No error toast should appear on success').toBeHidden();
 });


 test('TC-LOGIN-002: Invalid password shows error and stays on login', async ({ pages, appConfig }) => {
   const { loginPage } = pages;
   const { username } = appConfig.defaultUser;


   await loginPage.usernameInput.fill(username);
   await loginPage.passwordInput.fill('WrongPassword!');
   await loginPage.signInButton.click();


   await expect(loginPage.errorMessage, 'Error toast should appear for invalid credentials').toBeVisible();
   await expect(loginPage.errorMessage, 'Error toast should mention incorrect credentials').toContainText(/incorrect|invalid/i);
   await expect(loginPage.page, 'URL should remain on the login route').toHaveURL(/\/auth\/login/);
 });


 test('TC-LOGIN-003: Submitting empty form does not navigate away', async ({ pages }) => {
   const { loginPage } = pages;


   await loginPage.signInButton.click();


   await expect(loginPage.page, 'URL should stay on login when form is empty').toHaveURL(/\/auth\/login/);
   await expect(loginPage.usernameInput, 'Email input should still be visible').toBeVisible();
 });


 test('TC-LOGIN-004: Malformed email does not authenticate', async ({ pages }) => {
   const { loginPage } = pages;


   await loginPage.usernameInput.fill('not-an-email');
   await loginPage.passwordInput.fill('AnyPass1!');
   await loginPage.signInButton.click();


   await expect(loginPage.page, 'URL should stay on login for malformed email').toHaveURL(/\/auth\/login/);
 });
});


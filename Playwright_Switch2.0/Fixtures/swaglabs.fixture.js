const { test: base } = require('@playwright/test');
const { LoginPage } = require('../POMSwagLabs/LoginPage');
const { DashboardPage } = require('../POMSwagLabs/DashboardPage');

// Extend the base test with a login fixture
exports.test = base.extend({
    async login({ page }, use) {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    // You can replace these credentials with env variables or test data as needed
    // await loginPage.validLogin(process.env.USERNAME, process.env.PASSWORD);
    await loginPage.validLogin('standard_user', 'secret_sauce');
    await use(loginPage);
  },

  // Use fixtures for setup (login, navigation, etc.), 
  // and keep the main business assertions and flows in the test body for clarity.
  // so below is only for reference, you can remove it if not needed.
    async dashboard({ page }, use) {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addToCartProduct(ExpectedProduct);
    await dashboardPage.navigateToCart();
    await use(dashboardPage);
  },
});
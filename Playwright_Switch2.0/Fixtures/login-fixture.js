// login-fixture.js
const { test: base } = require('@playwright/test');

exports.test = base.extend({
  loginPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await use(page);
  }
});

// module.exports = test;

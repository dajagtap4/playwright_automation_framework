// fixtureDemo.test.js
const test = require('../../Fixtures/login-fixture');

test('authenticated test', async ({ loginPage }) => {
  await loginPage.goto('https://example.com/dashboard');
});

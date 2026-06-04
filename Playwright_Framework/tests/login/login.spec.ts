import { test } from '../../fixtures/baseFixture';
import users from '../../test-data/users.json';

test('Verify Login and Logout', async ({ page, loginPage, homePage }) => {

    await page.goto('/practice-test-login/');

    await loginPage.login(
        users.admin.username,
        users.admin.password
    );

    await homePage.verifySuccessfulLogin();
    console.log('Login Successful');

    await homePage.logout();

    await homePage.verifyLogout();
    console.log('Logout Successful');

});


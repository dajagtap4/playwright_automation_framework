import { test } from '../../fixtures/baseFixture';
import users from '../../test-data/users.json';

test('Verify Login', async ({
    page,
    loginPage,
    homePage
}) => {

    await page.goto('/practice-test-login/');

    await loginPage.login(
        users.admin.username,
        users.admin.password
    );

    await homePage.verifySuccessfulLogin();
});
import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";


test("test", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.fillUsername("admin");
    await loginPage.fillPassword("admin123");

    const homePage = await loginPage.clickLoginButton();
    await homePage.clickAdmin();
    await homePage.expectserviceTitleToBeVisible();

});
 const {test, expect} = require('@playwright/test');
 const { POManager2 } = require('../../POMbasecopy5/POManager2');

 test("Test 01 - basecopy5", async ({ page }) => {

    const poManager = new POManager2(page);

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin("jagtapdeepak@g.com","Deepak@1994");

    // dashboard -> Connect -> Community
    const dashboard = poManager.getDashboardPage();
    await dashboard.openCommunityPage();

    // click message button of user profile
    const com = poManager.getCommunityPage();
    await com.clikOnUserNameLink();

    // message button -> enter text -> Send Button
    const user = poManager.getUserProfilePage();
    await user.clickMessageButton();
    await user.enterTextAndSend("this is testing String4...");

 });

 test("Test 02 - basecopy5", async ({ page }) => {

    const poManager = new POManager2(page);

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin("jagtapdeepak@g.com","Deepak@1994");

    // dashboard -> Connect -> Community
    const dashboard = poManager.getDashboardPage();
    await dashboard.openCommunityPage();

    // click message button of user profile
    const com = poManager.getCommunityPage();
    await com.clikMessageButton();

    // message button -> enter text -> Send Button
    const user = poManager.getUserProfilePage();
    await user.enterTextAndSend("this is testing String4...");

 });
 const {test, expect} = require('@playwright/test');
 const { POManager2 } = require('../../POMbasecopy5/POManager2');

 // data-driven credentials
   const credentials = [
      { email: "jagtapdeepak@g.com", password: "Deepak@1994" },
      // Add more credential objects here if needed
      // if we add 3 objects then same test will run 3 times with different credentials.
];

credentials.forEach(({ email, password }) => {

 test(`@web Test 01 - basecopy5 [${email}]`, async ({ page }) => {

    const poManager = new POManager2(page);

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin(email, password);

    // dashboard -> Connect -> Community
    const dashboard = poManager.getDashboardPage();
    await dashboard.openCommunityPage();

    // click message button of user profile
    const com = poManager.getCommunityPage();
    await com.clikOnUserNameLink("Leonard leo");

    // message button -> enter text -> Send Button
    const user = poManager.getUserProfilePage();
    await user.clickMessageButton();
    await user.enterTextAndSend("this is testing String4...");

 });

 test(`@web Test 02 - basecopy5 [${email}]`, async ({ page }) => {

    const poManager = new POManager2(page);

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin(email, password);

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

 test(`@web Test 03 - Schedule meeting [${email}]`, async ({ page }) => {

    const poManager = new POManager2(page);

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin(email, password);

    // dashboard -> Connect -> Community
    const dashboard = poManager.getDashboardPage();
    await dashboard.openCommunityPage();

    // click message button of user profile
    const com = poManager.getCommunityPage();
    await com.clikMessageButton("Howard Sharma");

    // message button -> enter text -> Send Button
    const user = poManager.getUserProfilePage();
    await user.scheduleMeeting();
    
 });

 test(`@web Test 04 - calendar [${email}]`, async ({ page }) => {

    const poManager = new POManager2(page);

    // login
    const login = poManager.getLoginPage();
    await login.goTo();
    await login.validLogin(email, password);

    // dashboard -> Connect -> Event
    const dashboard = poManager.getDashboardPage();
    await dashboard.openConnectOption();

    const event = poManager.getEventPage();
    await event.createEvent();
    await event.selectDateFromCalendar();
 });
});
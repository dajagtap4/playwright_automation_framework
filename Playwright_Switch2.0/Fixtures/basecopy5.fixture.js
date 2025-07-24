const {test: base} = require('@playwright/test');
const {LoginPage} = require('../pageObjects/POMbasecopy5/LoginPage');

exports.test = base.extend({
    async login2({page}, use) {
        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin("jagtapdeepak@g.com", "Deepak@1994");
        //await loginPage.validLogin(process.env.USERNAME, process.env.PASSWORD);
        await use(login2);
    },
});
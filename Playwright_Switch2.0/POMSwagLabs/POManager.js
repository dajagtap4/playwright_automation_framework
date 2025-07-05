const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {MyInfoPage} = require('./MyInfoPage');
const {ThanksPage} = require('./ThanksPage');
const {CartPage} = require('./CartPage');
const {OverviewPage} = require('./OverviewPage');

class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.myInfoPage = new MyInfoPage(this.page);
    this.thanksPage = new ThanksPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.overviewPage = new OverviewPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}

getMyInfoPage()
{
    return this.myInfoPage;
}

getOverviewPage()
{
    return this.overviewPage;
}

getThanksPage()
{
    return this.thanksPage;
}
}
module.exports = {POManager};
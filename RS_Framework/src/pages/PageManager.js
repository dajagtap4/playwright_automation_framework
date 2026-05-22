const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { OrderReviewPage } = require('./OrderReviewPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');


class PageManager {
 constructor(page) {
   this.page = page;
   this.loginPage = new LoginPage(page);
   this.dashboardPage = new DashboardPage(page);
   this.cartPage = new CartPage(page);
   this.orderReviewPage = new OrderReviewPage(page);
   this.orderHistoryPage = new OrderHistoryPage(page);
 }
}


module.exports = { PageManager };



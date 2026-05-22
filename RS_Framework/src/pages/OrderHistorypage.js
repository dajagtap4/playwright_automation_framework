const { BasePage } = require('./BasePage');

class OrderHistoryPage extends BasePage {
 constructor(page) {
   super(page);
   this.ordersTable = page.locator('tbody');
   this.orderRows = page.locator('tbody tr');
   this.orderDetailId = page.locator('div.col-text');
 }


 async openOrderById(orderId) {
   this.log.info(`Locating order ${orderId} in history`);
   await this.ordersTable.waitFor();


   const rowCount = await this.orderRows.count();
   for (let i = 0; i < rowCount; i += 1) {
     const row = this.orderRows.nth(i);
     const rowOrderId = (await row.locator('th').textContent())?.trim();


     if (orderId.includes(rowOrderId)) {
       await row.locator('button').first().click();
       await this.waitForLoad();
       return;
     }
   }


   throw new Error(`Order "${orderId}" not found in history`);
 }


 async getDetailOrderId() {
   return (await this.orderDetailId.textContent())?.trim();
 }
}


module.exports = { OrderHistoryPage };



const logger = require('../utils/logger');

class BasePage {
 constructor(page) {
   if (!page) {
     throw new Error('BasePage requires a Playwright Page instance');
   }
   this.page = page;
   this.log = logger.child({ scope: this.constructor.name });
 }


 async open(path = '') {
   const url = path.startsWith('http') ? path : path;
   this.log.info(`Navigating to "${url || 'baseURL'}"`);
   await this.page.goto(url);
   await this.waitForLoad();
 }


 async waitForLoad(state = 'domcontentloaded') {
   await this.page.waitForLoadState(state);
}


 async title() {
   return this.page.title();
 }


 async url() {
   return this.page.url();
 }
}


module.exports = { BasePage };

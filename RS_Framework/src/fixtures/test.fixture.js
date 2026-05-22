const base = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');
const config = require('../config/env.config');
const logger = require('../utils/logger');


const test = base.test.extend({
 appConfig: async ({}, use) => {
   await use(config);
 },


 pages: async ({ page }, use) => {
   const manager = new PageManager(page);
   await use(manager);
 },


 loggedInPages: async ({ page, appConfig }, use, testInfo) => {
   const manager = new PageManager(page);
   const { username, password } = appConfig.defaultUser;


   if (!username || !password) {
     throw new Error(
       `Default user credentials are missing for ENV=${appConfig.env}. ` +
         'Set USER_EMAIL and USER_PASSWORD in the relevant env file.',
     );
   }


   logger.info(`[fixture] Pre-login for test "${testInfo.title}"`);
   await manager.loginPage.goto();
   await manager.loginPage.login(username, password);


   await use(manager);
 },
});


const { expect } = base;


module.exports = { test, expect };

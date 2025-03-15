import { Locator, Page, expect } from "@playwright/test";
const configDatas = require('../utils/configData.json');
const configLocators = require('../utils/configLocator.json');

class practicePOM {

    constructor(page) {
        this.page = page;
        this.username = page.locator(configLocators.nameInputBox);
    }
    
    async enterName(name) {
        await this.username.fill(configDatas.userName);
        return name;
    }

    async getPageTitle() {
        return await this.page.title();
    }
}

module.exports = { practicePOM };

const { Locator, Page, expect } = require("@playwright/test");
const configLocators2 = JSON.parse(JSON.stringify(require('../utils/configLocator.json')));
const configDatas2 = JSON.parse(JSON.stringify(require('../utils/configData.json')));

class practicePOM {
    constructor(page) {
        this.page = page;
        this.username = page.locator(configLocators2.nameInputBox);
    }
    async enterName(name) {
        await this.username.fill(configDatas2.userName);
        return name;
    }

    async getPageTitle() {
        return await this.page.title();
    }
}

module.exports = { practicePOM };

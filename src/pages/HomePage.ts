import { Page, expect } from "@playwright/test";

export default class HomePage{

    private readonly serviceTitleLocator = "//*[@id='app']/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a/span";
    private readonly adminLocator = "//*[@id='app']/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a/span";

    constructor (private page: Page){
        
    }

    async clickAdmin(){
        await this.page.locator(this.adminLocator).click();
    }

    async expectserviceTitleToBeVisible(){
        await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({timeout : 15000});
    }
}
import { Locator, Page } from "@playwright/test"

export class myInfo{

    readonly page: Page
    readonly clickMyInfo : Locator
    readonly countryDropdown : Locator
    readonly save : Locator

    constructor(page: Page){
       this.page = page
       this.clickMyInfo = page.getByText("My Info")
       this.countryDropdown = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[1]/form/div[3]/div[1]/div[1]/div/div[2]/div/div/div[2]')
       this.save = page.getByText("Save")
    }

    async saveMyInfo(){
        await this.clickMyInfo.click()
        await this.countryDropdown.selectOption('British')// not working 
        await this.save.click()
    }
}
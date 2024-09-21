import { Locator, Page } from "@playwright/test"

export class myInfo{

    readonly page: Page
    readonly clickMyInfo : Locator
    readonly countryDropdown : Locator
    readonly save : Locator

    constructor(page: Page){
       this.page = page
       this.clickMyInfo = page.getByText("My Info")
       this.save = page.getByText("Save")
    }

    async saveMyInfo(){
        await this.clickMyInfo.click()
        await this.save.click()
    }
}
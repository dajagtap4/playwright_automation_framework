import { Locator, Page } from "@playwright/test"

export class logoutPage{

    readonly page: Page
    readonly threeDot : Locator
    readonly logoutButton : Locator

    constructor(page: Page){
       this.page = page
       this.threeDot = page.locator('.nI-gNb-bar2')
       this.logoutButton = page.locator("a[title='Logout']")
    }

    async logoutFromPage(){
        await this.threeDot.click()
        await this.page.waitForTimeout(1000)
        await this.logoutButton.click()
    }
}
import { Locator, Page } from "@playwright/test"

export class logoutPage{

    readonly page: Page
    readonly userDropdown : Locator
    readonly logoutButton : Locator

    constructor(page: Page){
       this.page = page
       this.userDropdown = page.locator('//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/i')
       this.logoutButton = page.getByText("Logout")
    }

    async logoutFromPage(){
        await this.userDropdown.click()
        await this.logoutButton.click()
    }
}
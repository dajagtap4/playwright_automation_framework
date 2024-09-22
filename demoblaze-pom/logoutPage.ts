import { Locator, Page } from "@playwright/test"

export class logoutPage{

    readonly page: Page
    readonly logoutLink : Locator
    //readonly logoutButton : Locator

    constructor(page: Page){
       this.page = page
       this.logoutLink = page.locator('#logout2')
       //this.logoutButton = page.getByText("Logout")
    }

    async logoutFromPage(){
        await this.page.waitForTimeout(2000)
        await this.logoutLink.click()
        await this.page.waitForTimeout(2000)
        //await this.logoutButton.click()
    }
}
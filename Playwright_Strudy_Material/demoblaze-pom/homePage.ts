import { Locator, Page } from "@playwright/test"

export class homePage{

    readonly page: Page
    readonly selectSamsungGalaxyS6Product : Locator

    constructor(page: Page){
       this.page = page
       this.selectSamsungGalaxyS6Product = page.locator('.hrefch').first()
    }

    async selectProductOnHomePage(){
        await this.selectSamsungGalaxyS6Product.click();
            await this.page.waitForTimeout(2000)
    }
}
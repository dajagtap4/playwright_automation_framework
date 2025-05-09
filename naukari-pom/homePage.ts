import { Locator, Page } from "@playwright/test"

export class homePage{

    readonly page: Page
    readonly threeDot : Locator
    readonly viewUpdateProfile : Locator
    //readonly uploadResumeButton : Locator

    constructor(page: Page){
       this.page = page
       this.threeDot = page.locator('.nI-gNb-bar2')
       this.viewUpdateProfile = page.locator("//a[normalize-space()='View & Update Profile']")
      // this.uploadResumeButton = page.locator("input[value='Update resume']")
    }

    async uploadCV(){
        await this.threeDot.click();
            await this.page.waitForTimeout(1000)
        await this.viewUpdateProfile.click();
                await this.page.waitForTimeout(1000)
        //await this.uploadResumeButton.setInputFiles('src/tests/uploadFiles/QA_Deepak_Jagtap.pdf')
            await this.page.waitForTimeout(1000)
    }
}
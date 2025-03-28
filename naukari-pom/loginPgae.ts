import { expect, Locator, Page } from "@playwright/test"

export class loginPage{

    readonly page: Page
    readonly loginButton : Locator
    readonly usernameInputSelector : Locator
    readonly passwordInputSelector : Locator
    readonly loginButtonSelector : Locator

    constructor(page: Page){
       this.page = page
       this.loginButton = page.locator('#login_Layer')
       this.usernameInputSelector = page.getByPlaceholder('Enter your active Email ID / Username')
       this.passwordInputSelector = page.getByPlaceholder('Enter your password')
       this.loginButtonSelector = page.locator("button[type='submit']")
    }

    async loginToPage(){
        await this.loginButton.click();
            await this.page.waitForTimeout(1000)
        await this.usernameInputSelector.fill("jagtapda1765@gmail.com");
            await this.page.waitForTimeout(1000)
        await this.passwordInputSelector.fill("Deepak@1994");
            await this.page.waitForTimeout(1000)
        await this.loginButtonSelector.click();
    }

    async checkLoginFunctionality(){
         //assert user login to application 
         await expect(await this.page.locator('//span[@class="reco-title"]')).toHaveText('Recommended jobs for you')
         await this.page.waitForTimeout(1000)
    }
}
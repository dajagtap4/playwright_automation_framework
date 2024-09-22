import { expect, Locator, Page } from "@playwright/test"

export class loginPage{

    readonly page: Page
    readonly loginLink : Locator
    readonly usernameInputSelector : Locator
    readonly passwordInputSelector : Locator
    readonly loginButtonSelector : Locator

    constructor(page: Page){
       this.page = page
       this.loginLink = page.locator('#login2')
       this.usernameInputSelector = page.locator('#loginusername')
       this.passwordInputSelector = page.locator('#loginpassword')
       this.loginButtonSelector = page.getByRole('button', {name:"Log in"})
    }

    async loginToPage(){
        await this.loginLink.click();
            await this.page.waitForTimeout(1000)
        await this.usernameInputSelector.fill("pavanol");
            await this.page.waitForTimeout(1000)
        await this.passwordInputSelector.fill("test@123");
        await this.loginButtonSelector.click();
            await this.page.waitForTimeout(2000)
    }

    async checkLoginFunctionality(){
         //assert user login to application 
         await expect(await this.page.locator('#logout2')).toHaveText('Log out')
         await this.page.waitForTimeout(1000)
    }
}
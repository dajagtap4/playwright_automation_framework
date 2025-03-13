import { Locator, Page } from "@playwright/test"

export class loginPage{

    readonly page: Page
    readonly usernameInputSelector : Locator
    readonly passwordInputSelector : Locator
    readonly loginButtonSelector : Locator

    constructor(page: Page){
       this.page = page
       this.usernameInputSelector = page.getByPlaceholder('Username')
       this.passwordInputSelector = page.getByPlaceholder('Password')
       this.loginButtonSelector = page.getByRole('button', {name:"Login"})
    }

    async loginToPage(){
        await this.usernameInputSelector.fill("Admin");
        await this.passwordInputSelector.fill("admin123");
        await this.loginButtonSelector.click();
    }
}
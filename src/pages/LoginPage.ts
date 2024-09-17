import { Page } from "@playwright/test"
import HomePage from "./HomePage";

export default class LoginPage {
    private readonly usernameInputSelector = "//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input";
    private readonly passwordInputSelector = "//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input";
    private readonly loginButtonSelector = "//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button";

     constructor(private page: Page){
        
    }

    async navigateToLoginPage(){
        await this.page.goto("/");
    }

    async fillUsername(username: String){
        await this.page.locator(this.usernameInputSelector).fill(username);
    }

    async fillPassword(password: String){
        await this.page.locator(this.passwordInputSelector).fill(password);
    }

    async clickLoginButton(){
        await this.page
        .locator(this.loginButtonSelector).click();

        const homePage = new HomePage(this.page);
        return homePage;
    }
}
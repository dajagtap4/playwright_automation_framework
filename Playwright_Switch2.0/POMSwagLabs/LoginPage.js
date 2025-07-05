class LoginPage {

constructor(page)
{
    this.page = page;
    this.signInbutton= page.locator("#login-button");
    this.userName = page.locator("//input[@id='user-name']");
    this.passWord = page.locator("#password");

}

async goTo()
{
    await this.page.goto("https://www.saucedemo.com");
}

async validLogin(username, password) {
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle'); 
}

}
module.exports = {LoginPage};
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
 constructor(page) {
   super(page);
   this.usernameInput = page.locator('#userEmail');
   this.passwordInput = page.locator('#userPassword');
   this.signInButton = page.locator("[value='Login']");
   this.errorMessage = page.locator('.toast-error');
 }


 async goto() {
   await this.open('#/auth/login');
 }


 async login(username, password) {
   this.log.info(`Logging in as "${username}"`);
   await this.usernameInput.fill(username);
   await this.passwordInput.fill(password);
   await this.signInButton.click();
   await this.waitForLoad();
 }
}


module.exports = { LoginPage };



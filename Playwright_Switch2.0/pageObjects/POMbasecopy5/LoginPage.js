class LoginPage {

constructor(page)
{
    this.page = page;
    this.Sign_In= page.locator("div.buttonGroup__F2P8n>button:nth-of-type(1)");
    this.login = page.locator("button[type=submit]>span");
    this.userName = page.locator("#email");
    this.passWord = page.locator("#password");

}

async goTo(url)
{
    //await this.page.goto("https://basecopy5.staging.pg-test.com/v2/"); 
    // taking url from (path ->) env/.env.local file
    //await this.page.goto(process.env.BASE_URL);
      await this.page.goto(url);

}

async validLogin(username, password) {
    await this.Sign_In.waitFor({ state: 'visible' });
    await this.Sign_In.click();
    await this.userName.fill(username);
    await this.passWord.fill(password);
    await this.login.click();
    await this.page.waitForLoadState('networkidle'); 
}

}
module.exports = {LoginPage};
const { expect } = require('@playwright/test');

class UserProfilePage {
    constructor(page) {

        this.page = page;
        this.careerExp = page.getByText("Career Exploration", { exact: true });
        this.send = page.locator('.inbox__input__schedule-msg-btn>button:first-child');
        this.viewPro = page.locator(".profileSection__wheZv.userHelp__AwDsi+button");
        this.messageButton = page.locator(".btnContainer__OkY9t.meetingBtn__hBMAl>:first-child");
        this.textInput = page.locator('[contenteditable="true"]');
    }

    async addMessageAndSend() {
        await expect(this.careerExp).toBeVisible({ timeout: 5000 });
        await this.careerExp.click();
        await expect(this.send).toBeVisible({ timeout: 5000 });
        await this.send.click();
    }

    async clickMessageButton(){
        await this.page.waitForLoadState('networkidle');
        await this.messageButton.click();
    }

    async viewProfile(){
        await this.viewPro.click();
    }

    async enterTextAndSend(message) {
    await this.textInput.waitFor({ state: 'visible' });
    await this.textInput.type(message);

    // Ensure the button is fully ready
    await expect(this.send).toBeAttached();
    await expect(this.send).toBeVisible();
    await expect(this.send).toBeEnabled();

    // Now perform a real click
    await this.page.waitForTimeout(5000);
    //await this.page.pause();
    await this.send.click({ force: true });
}

}
module.exports = {UserProfilePage};
const { expect } = require('@playwright/test');
class UserProfilePage {

    constructor(page) {

        this.page = page;
        this.careerExp = page.getByText("Career Exploration", { exact: true });
        this.send = page.locator('.inbox__input__schedule-msg-btn>button:first-child');
        this.viewPro = page.locator(".profileSection__wheZv.userHelp__AwDsi+button");
        this.messageButton = page.locator(".btnContainer__OkY9t.meetingBtn__hBMAl>:first-child");
        this.textInput = page.locator('[contenteditable="true"]');
        this.usernameonprofilepage = page.locator(".name__Dedk7");
        this.schedulemeetingbutton = page.locator(".composeMessage__Uj6m9>:last-child>button>div");
        this.cancel = page.locator(".meeting-schedule__actions>div+button");
        this.requiestMeetingButton = page.locator(".meeting-schedule__actions>div");
        this.time = page.locator(".meeting-schedule__sync-slots-v3>div>label:first-child");

    }

    async scheduleMeeting(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.usernameonprofilepage).toHaveText("Howard Sharma");
        await this.schedulemeetingbutton.click();
        //await this.page.pause();
        //await this.datePicker().toBeVisible({ timeout: 5000 });
        await this.time.waitFor({ state: 'visible' });
        await this.datePicker();
        await this.time.click();
        await expect(this.cancel).toBeVisible({ timeout: 5000 });
        await this.requiestMeetingButton.click();
        //await this.page.pause();
        await this.page.waitForTimeout(2000);
    }

    async datePicker(){
        await this.page.waitForLoadState('networkidle');
        const date = "25";
        await this.page.locator(`//span[text()="${date}"]`).click();
    }

    async addMessageAndSend() {
        await expect(this.careerExp).toBeVisible({ timeout: 5000 });
        await this.careerExp.click();
        await expect(this.send).toBeVisible({ timeout: 5000 });
        await this.send.click();
    }

    async clickMessageButton(){
        await this.messageButton.click();
    }

    async viewProfile(){
        await this.viewPro.click();
    }

    async enterTextAndSend(message) {
        //await this.textInput.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(3000);
        await this.textInput.type(message);

        // Ensure the button is fully ready
        await expect(this.send).toBeAttached();
        await expect(this.send).toBeVisible();
        await expect(this.send).toBeEnabled();

        // Now perform a real click
        //await this.page.waitForTimeout(3000);
        //await this.page.pause();
        await this.send.click({ force: true });
        console.log("Test passed....");
        
    }

}
module.exports = {UserProfilePage};
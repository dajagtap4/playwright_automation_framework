import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.successMessage =
            page.locator('h1.post-title');
    }

    async verifySuccessfulLogin() {
        await expect(this.successMessage)
            .toHaveText('Logged In Successfully');
    }
}
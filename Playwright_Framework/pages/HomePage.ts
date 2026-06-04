import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly successMessage: Locator;
    readonly logoutButton: Locator; 

    constructor(page: Page) {
        this.page = page;

        this.successMessage =
            page.locator('h1.post-title');

        this.logoutButton = 
            page.locator('a', { hasText: 'Log out' }); 
    }

    async verifySuccessfulLogin() {
        await expect(this.successMessage)
            .toHaveText('Logged In Successfully');
    }

    async logout() {                                                                               
      await this.logoutButton.click();                      
  } 

    async verifyLogout() {                                                                         
      await expect(this.page).toHaveURL(/practice-test-login/);                                  
      await expect(this.page.locator('#username')).toBeVisible();                                
  } 
}

import { page, expect, test } from '@playwright/test'

test.describe('Handling dialogs - alert,confirm, prompt', () => {

    let page;
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();  // Create a new page instance
    });

    test.beforeEach(async () => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

    test('TC001 alert  Handling', async () => {
        page.on('dialog', async dialog => {

            expect(dialog.type()).toContain('alert')
            expect(dialog.message()).toContain('I am an alert box!')

            await dialog.accept()
        })
        await page.click('//*[@id="alertBtn"]');
    })

    test('TC002 confirm dialog Handling', async () => {
        page.on('dialog', async dialog => {

            expect(dialog.type()).toContain('confirm')
            expect(dialog.message()).toContain('Press a button')

            await dialog.accept()
        })
        await page.click('//*[@id="confirmBtn"]')
        await expect(page.locator('#demo')).toHaveText('You pressed OK!')
    })

    test('TC003 prompt dialog Handling', async () => {
        page.on('dialog', async dialog => {

            expect(dialog.type()).toContain('prompt')
            expect(dialog.message()).toContain('Please enter your name:')
            expect(dialog.defaultValue()).toContain('Harry Potter')
            
            await dialog.accept('John')
        })
        await page.click('//*[@id="promptBtn"]')
        await expect(page.locator('#demo')).toHaveText('Hello John! How are you today?')
    })

    test.afterAll(async () => {
        await page.close();
    });

});
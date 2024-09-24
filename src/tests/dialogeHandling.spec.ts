import {test,Page, expect} from '@playwright/test'
import exp from 'constants'

test('alert',async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    
    page.on('dialog',async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('I am an alert box!')
        await page.waitForTimeout(1000)
        await dialog.accept()
    })
    
    await page.click('//button[normalize-space()="Alert"]')
    
    await page.waitForTimeout(1000)
    await page.close()
})


test('confirm alert',async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    
    page.on('dialog',async dialog => {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain('Press a button')
        await page.waitForTimeout(1000)
        await dialog.accept()
    })
    
    await page.click('//button[normalize-space()="Confirm Box"]')
    await expect(page.locator('#demo')).toHaveText('You pressed OK!')
    await page.waitForTimeout(2000)
    await page.close()
})

test('Prompt',async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    
    page.on('dialog',async dialog => {
        expect(dialog.type()).toContain('prompt')
        expect(dialog.message()).toContain('Please enter your name:')
        expect(dialog.defaultValue()).toContain('Harry Potter')
        await page.waitForTimeout(1000)
        await dialog.accept('John')
    })
    
    await page.click('//button[normalize-space()="Prompt"]')
    await expect(page.locator('#demo')).toHaveText('Hello John! How are you today?')
    await page.waitForTimeout(2000)
    await page.close()
})
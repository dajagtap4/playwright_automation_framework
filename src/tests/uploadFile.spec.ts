import { test, Page, expect } from '@playwright/test'

test('uploadfile', async ({ page }) => {

    await page.goto('https://demo.automationtesting.in/FileUpload.html')
    await page.waitForTimeout(1000)
    
    await page.locator('#input-4').setInputFiles('src/tests/uploadFiles/Java_Playwright_Adreena.docx')

    await page.waitForTimeout(1000)
    await page.close()
})
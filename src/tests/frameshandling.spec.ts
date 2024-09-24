import {test,Page, expect} from '@playwright/test'

test('frames',async ({page}) => {
    
    await page.goto('https://testautomationpractice.blogspot.com/')
    
    await page.frameLocator('#frame-one796456169').locator('//*[@id="q2"]/table/tbody/tr[1]/td/label').click()
    
    await page.waitForTimeout(1000)
    await page.close()
})
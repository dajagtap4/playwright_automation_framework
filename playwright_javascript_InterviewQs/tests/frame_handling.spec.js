import {test,Page, expect} from '@playwright/test'

test('frames',async ({page}) => {
    
    await page.goto('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_links_w3schools', { waitUntil: 'domcontentloaded' });
    
    const frame = page.frameLocator('#iframeResult');

    await frame.locator('body > p > a').click();
    
})
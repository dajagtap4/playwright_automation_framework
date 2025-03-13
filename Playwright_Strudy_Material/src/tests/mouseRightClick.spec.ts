import { test } from "@playwright/test"

test("right",async ({page}) => {

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html')
    
    const rightClick = await page.locator("//div[@class='document']/p/span")

    await rightClick.click({button:"right"})
})
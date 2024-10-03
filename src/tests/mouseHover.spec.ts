import { test } from "@playwright/test"

test("mouse",async ({page}) => {

    await page.goto('https://demo.opencart.com/')

    const desktops = await page.locator("//nav[@id='menu']/div[2]/ul/li[1]/a[1]")
    const mac = await page.locator("//nav[@id='menu']/div[2]/ul/li[1]/div[1]/div/ul/li[2]/a")

    await page.waitForTimeout(500)
    await desktops.hover()
    await page.waitForTimeout(500)
    await mac.hover()

    await page.waitForTimeout(1000)
    await page.close()
})
import { test } from "@playwright/test"

test("scr",async ({page}) => {

    await page.goto('https://www.cybage.com/')

    await page.screenshot({ path: 'tests/screenshots/screenshot.png' });
})
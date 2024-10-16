import { test } from "@playwright/test"

test("keyboardActions",async ({page}) => {
 
    await page.goto("https://gotranscript.com/text-compare")

    await page.locator('[name="text1"]').fill("Deepak jagtap")

    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')

    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')

    await page.keyboard.press('Control+V')
});

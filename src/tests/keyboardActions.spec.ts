    await page.keyboard.press('Control+A')
    await page.keyboard.press('Control+C')

    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')

    await page.keyboard.press('Control+V')

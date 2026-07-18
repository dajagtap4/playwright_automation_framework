const { test, expect } = require('@playwright/test');

test('Handle New Tab', async ({ page, context }) => {

    await page.goto('https://practice.expandtesting.com/windows');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: 'Click Here' }).click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');

    // Validate title
    await expect(newPage).toHaveTitle('Example of a new window');

    await page.waitForTimeout(1000);

    // Switch back to original tab
    await page.bringToFront();

    await page.waitForTimeout(1000);

    // Switch back to new tab
    await newPage.bringToFront();

    await page.waitForTimeout(1000);
});

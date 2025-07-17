// test-info-example.spec.js
const { test, expect } = require('@playwright/test');

test('log metadata example', async ({ page }, testInfo) => {
  // 1. Title of the test
  console.log('📝 Title:', testInfo.title); // log metadata example

  // 2. Expected status
  console.log('🎯 Expected Status:', testInfo.expectedStatus); // passed

  // 3. Retry count
  console.log('🔁 Retry Count:', testInfo.retry); // 0 on first run

  // 4. Project name (from playwright.config.js)
  console.log('📁 Project Name:', testInfo.project.name); // usually "default" if not customized

  // 5. Test file path
  console.log('📂 Test File:', testInfo.file);

  // 6. Output directory (for screenshots, videos, traces)
  console.log('📸 Output Dir:', testInfo.outputDir);

  // 7. Annotations (skip, fail, fixme if added)
  console.log('🏷️ Annotations:', testInfo.annotations);

  // 8. Custom attachment (log, debug info, etc.)
  testInfo.attachments.push({
    name: 'debug-log.txt',
    contentType: 'text/plain',
    body: Buffer.from('This is a debug message inside the test.'),
  });

  // 9. Conditional logic based on retry
  if (testInfo.retry > 0) {
    console.log('⚠️ This is a retry attempt');
  }

  // Let’s interact with a real site for demo
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);

  // 10. Status during execution is undefined
  console.log('❓ Status (during execution):', testInfo.status); // undefined
});

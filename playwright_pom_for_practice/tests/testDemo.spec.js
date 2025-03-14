const { test, expect } = require('@playwright/test');
const { practicePOM } = require('../pages/practicePOM');
const configDatas = JSON.parse(JSON.stringify(require('../utils/configData.json')));
const configLocators = JSON.parse(JSON.stringify(require('../utils/configLocator.json')));

test.describe('Practice POM Test Suite', () => {

    let page;
    let practice;

    test.beforeAll(async ({ browser }) => {
        // Launching browser and creating a new page
        page = await browser.newPage();
        practice = new practicePOM(page); // Instantiate the POM
    });

    test.beforeEach(async () => {
        // Navigate to the test URL before each test
        await page.goto(configDatas.testurl);
    });

    test(' the Page Title', async () => {
        const title = await practice.getPageTitle();
        expect(title).toBe(configDatas.expectedTitle);
    });

    test('Enter Name and Verify Input', async () => {
        await practice.enterName(configDatas.userName); // Use the method to enter name
        const enteredName = await page.locator(configLocators.nameInputBox).inputValue();
        expect(enteredName).toBe(configDatas.userName);
    });

    test.afterAll(async () => {
        // Close the page after tests
        await page.close();
    });

});

import { test, expect } from '@playwright/test';
import { practicePOM } from '../pages/practicePOM';
const configDatas = JSON.parse(JSON.stringify(require('../utils/configData.json')));
const configLocators = JSON.parse(JSON.stringify(require('../utils/configLocator.json')));

test.describe('Practice POM Test Suite', () => {

    let page;
    let practice;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();  // Create a new page instance
        practice = new practicePOM(page); // Instantiate the POM
    });

    test.beforeEach(async () => {
        // Navigate to the test URL before each test
        await page.goto(configDatas.testurl); // Use 'page' from beforeAll
    });

    test('TC001 the Page Title', async () => {
        const title = await practice.getPageTitle();
        expect(title).toBe(configDatas.expectedTitle);
    });

    test('TC002 verigy incorrect Page Title', async () => {
        const title = await practice.getPageTitle();
        expect(title).not.toBe(configDatas.wrongtitle);
    });

    test('TC003 Enter Name and Verify Input', async () => {
        await practice.enterName(configDatas.userName);  // Use 'practice' from beforeAll
        const enteredName = await page.locator(configLocators.nameInputBox).inputValue();
        expect(enteredName).toBe(configDatas.userName);
    });

    test.afterAll(async () => {
        // Close the page after tests
        await page.close();
    });

});

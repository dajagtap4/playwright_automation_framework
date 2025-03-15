import { test, expect } from '@playwright/test';
import { practicePOM } from '../pages/practicePOM';
const configDatas = require('../utils/configData.json');
const configLocators = require('../utils/configLocator.json');

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

    test('TC003 verigy Title ".not.toBe()" empty', async () => {
        const title = await practice.getPageTitle();
        expect(title).not.toBe("");
    });

    test('TC004 verify Title ".not.toContain()" Unexpected Text', async () => {
        const title = await practice.getPageTitle();
        expect(title).not.toContain('error');
    });

    test('TC005 verify user can Enter Name and Verify Input', async () => {
        await practice.enterName(configDatas.userName);  // Use 'practice' from beforeAll
        const ActualEnteredName = await page.locator(configLocators.nameInputBox).inputValue();
        expect(ActualEnteredName).toBe(configDatas.userName);
    });

    test('TC006 verify user can enter empty input', async () => {
        await practice.enterName(""); 
        const ActualEnteredName = await practice.username.inputValue();
        expect(ActualEnteredName).toBe("");
    });

    test.afterAll(async () => {
        await page.close();
    });

});

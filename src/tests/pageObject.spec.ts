import {test} from '@playwright/test'
import { loginPage } from '../../page-objects/loginPage';
import { logoutPage } from '../../page-objects/logoutPage';
import { myInfo } from '../../page-objects/myInfo';

test.beforeEach(async( {page} ) => {
    await page.goto("/")

    const login = new loginPage(page)
    await login.loginToPage();
})

test('myInfo',async({page})=> {
    const myinfo = new myInfo(page)
    await myinfo.saveMyInfo()   
})

test.afterEach(async( {page} ) => {
    const logout = new logoutPage(page)
    await logout.logoutFromPage();
    await page.close();
})
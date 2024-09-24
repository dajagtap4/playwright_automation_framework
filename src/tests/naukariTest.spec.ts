import {test} from '@playwright/test'
import { loginPage } from '../../naukari-pom/loginPgae'
import { homePage } from '../../naukari-pom/homePage'

import { logoutPage } from '../../naukari-pom/logoutPage'

test.beforeEach(async( {page} ) => {
    await page.goto("https://www.naukri.com/")
})

test('TS:001 - check user login to naukari',async({page})=> {
    const login = new loginPage(page)
    await login.loginToPage(); 
    await login.checkLoginFunctionality()
})

test('TS:002 - upload CV',async({page})=> {
    const login = new loginPage(page)
    const home = new homePage(page)

    await login.loginToPage(); 
    await login.checkLoginFunctionality()

    await home.uploadCV()
})

test.afterEach(async( {page} ) => {
    const logout = new logoutPage(page)
    await logout.logoutFromPage();
    await page.close();
})
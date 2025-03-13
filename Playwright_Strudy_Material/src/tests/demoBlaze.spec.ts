import {test, Locator, expect} from '@playwright/test'

import { loginPage } from '../demoblaze-pom/loginPage'
import { homePage } from '../demoblaze-pom/homePage'
import { logoutPage } from '../demoblaze-pom/logoutPage'
import { cartPage } from '../demoblaze-pom/cartPage'
import { placeOdrForm } from '../demoblaze-pom/placeOdrForm'

test.beforeEach(async( {page} ) => {
    await page.goto("https://www.demoblaze.com/index.html")
})

test('TC:001 - Check user can login to application',async( {page} ) => {
    const login = new loginPage(page)
    await login.loginToPage()
    await login.checkLoginFunctionality()
})

test('TC:002 - Check user can select product from item list',async( {page} ) => {
   
    const login = new loginPage(page)
    const logout = new logoutPage(page)
    const home = new homePage(page)
    const cart = new cartPage(page)
    
    await login.loginToPage();
    await login.checkLoginFunctionality()
    await home.selectProductOnHomePage();
    await cart.checkAddToCartbuttonVisible();
})

test('TC:003 - Check user can add product in cart and delete it',async( {page} ) => {
   
    const login = new loginPage(page)
    const home = new homePage(page)
    const cart = new cartPage(page)
    
    await login.loginToPage();
    await login.checkLoginFunctionality()
    await home.selectProductOnHomePage()
    await cart.checkAddToCartbuttonVisible()
    await cart.addToCartButton()
    await cart.cartUI()
    await cart.deleteProductFromCart()
})

test('TC:004 - Check user can place order and verify confirmation massage',async( {page} ) => {
   
    const login = new loginPage(page)
    const home = new homePage(page)
    const cart = new cartPage(page)
    const orderPlcae = new placeOdrForm(page)
    const logout = new logoutPage(page)

    await login.loginToPage();
    await login.checkLoginFunctionality()
    await home.selectProductOnHomePage()
    await cart.checkAddToCartbuttonVisible()
    await cart.addToCartButton()
    await cart.cartUI()
    await cart.placeOrder()
    await orderPlcae.fillPlaceOrderForm()
    await orderPlcae.checkThankYouForYourPurchase()
    await orderPlcae.oKButton()
    await logout.logoutFromPage()
})

test.afterEach(async( { page }) => {
    await page.close();
})

import { Locator, expect} from '@playwright/test'
import { test } from '../../Fixtures/loginFixture';

test.beforeEach(async( {page,loginP} ) => {
    await page.goto("/index.html")
    await loginP.loginToPage()
    await loginP.checkLoginFunctionality()
})

test('TC:001 - Check user can login to application',async( {page,loginP} ) => {
    // code added in beforeEach
    // await loginP.loginToPage()
    // await loginP.checkLoginFunctionality()
})

test('TC:002 - Check user can select product from item list',async( {page,homeP,cartP} ) => {
    
    await homeP.selectProductOnHomePage();
    await cartP.checkAddToCartbuttonVisible();
})

test('TC:003 - Check user can add product in cart and delete it',async( {page,homeP,cartP} ) => {

    await homeP.selectProductOnHomePage()
    await cartP.checkAddToCartbuttonVisible()
    await cartP.addToCartButton()
    await cartP.cartUI()
    await cartP.deleteProductFromCart()
})

test('TC:004 - Check user can place order and verify confirmation massage',async( {page,homeP,cartP,placeOdrFormP,logoutPageP} ) => {

    await homeP.selectProductOnHomePage()
    await cartP.checkAddToCartbuttonVisible()
    await cartP.addToCartButton()
    await cartP.cartUI()
    await cartP.placeOrder()
    await placeOdrFormP.fillPlaceOrderForm()
    await placeOdrFormP.checkThankYouForYourPurchase()
    await placeOdrFormP.oKButton()
    await logoutPageP.logoutFromPage()
})

test.afterEach(async( { page }) => {
    await page.close();
})

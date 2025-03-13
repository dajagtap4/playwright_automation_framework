import {test, Page, Locator, expect} from '@playwright/test'

export class cartPage{

    readonly page: Page
    readonly addTocart : Locator
    readonly cartOption : Locator
    readonly deleteFromCart : Locator
    readonly placeorderBtn: Locator

    constructor(page: Page){
       this.page = page
       this.cartOption = page.locator('//*[@id="navbarExample"]/ul/li[4]/a')
       this.addTocart = page.locator('//*[@id="tbodyid"]/div[2]/div/a')
       this.deleteFromCart = page.locator('//*[@id="tbodyid"]/tr/td[4]/a')
       this.placeorderBtn = page.locator('.btn.btn-success')
    }

    async cartUI(){
        await this.cartOption.click()
            await this.page.waitForTimeout(1000)
    }

    async addToCartButton(){
        await this.addTocart.click();
            await this.page.waitForTimeout(2000)
    }

    async placeOrder(){
        await this.placeorderBtn.first().click();
            await this.page.waitForTimeout(4000)
    }

    async deleteProductFromCart(){
        await this.deleteFromCart.first().click();
            await this.page.waitForTimeout(4000)
    }

    async checkAddToCartbuttonVisible(){
        //assert add to cart
        await expect(await this.page.locator('//*[@id="tbodyid"]/div[2]/div/a')).toHaveText('Add to cart')
    }
}

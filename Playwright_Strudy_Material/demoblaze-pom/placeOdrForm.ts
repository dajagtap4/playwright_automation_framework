import {test, Page, Locator, expect} from "@playwright/test"

export class placeOdrForm{

    readonly page:Page
    readonly name:Locator
    readonly country:Locator
    readonly city:Locator
    readonly cc:Locator
    readonly mnth:Locator
    readonly yr:Locator
    readonly purchase:Locator
    readonly ty:Locator
    readonly OK:Locator

    constructor(page: Page){
        this.page = page
        this.name = page.locator('#name')
        this.country = page.locator('#country')
        this.city = page.locator('#city')
        this.cc = page.locator('#card')
        this.mnth = page.locator('#month')
        this.yr = page.locator('#year')
        this.purchase = page.locator('[onclick="purchaseOrder()"]')
        this.ty = page.locator('body > div.sweet-alert.showSweetAlert.visible > h2')
        this.OK = page.locator("[class='confirm btn btn-lg btn-primary']")
    }

    async fillPlaceOrderForm(){
        await this.name.fill("Deepak")
        await this.page.waitForTimeout(200)

        await this.country.fill("India")
        await this.page.waitForTimeout(200)

        await this.city.fill("Pune")
        await this.page.waitForTimeout(200)

        await this.cc.fill("11111111111111")
        await this.page.waitForTimeout(200)

        await this.mnth.fill("Oct")
        await this.page.waitForTimeout(200)

        await this.yr.fill("2024")
        await this.page.waitForTimeout(1000)

        await this.purchase.click()
    }

    async checkThankYouForYourPurchase(){
        await expect(this.ty).toBeVisible()
    }

    async oKButton(){
        await this.OK.click()
    }
}

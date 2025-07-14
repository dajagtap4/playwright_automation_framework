class DashboardPage
{
constructor(page)
{
    this.page = page;
    this.connect = page.locator('#headlessui-popover-button-1');
    this.community = page.locator(".submenu-0-0");
    this.products = page.locator(".productsList>button>div>p:first-child");
}

async openCommunityPage() {
    await this.connect.hover();
    await this.selectCommunity();
}

async selectCommunity(){

    const productList = this.products;
    const count = await productList.count();

    for(let i=0;i<count;i++)
        {
        const productText = await productList.nth(i).textContent();
            if(productText === "Community")
            {
                await productList.nth(i).click();
                break;
            }
        }
    }
}
module.exports = {DashboardPage};
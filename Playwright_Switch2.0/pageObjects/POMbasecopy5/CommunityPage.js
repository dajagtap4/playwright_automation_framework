class CommunityPage{
    constructor(page){
        this.page = page;
        this.users =page.locator(".people-card__content__inner");
    }

    async clikOnUserNameLink(username){
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(".people-card__content__inner").last().waitFor();

        const usersLocator = this.users;
        const count = await usersLocator.count();

        for(let i=0;i<count;i++){
                
            const usersNames = usersLocator.nth(i).locator(">div:first-child>a>h3");
            const userText = await usersNames.textContent();

            if(userText === username){
                await usersNames.click();
                break;
            }
        }
    }

    async clikMessageButton(username){
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(".people-card__content__inner").last().waitFor();

        const usersLocator = this.users;
        const count = await usersLocator.count();

        for(let i=0;i<count;i++){
                
            const usersNames = usersLocator.nth(i).locator(">div:first-child>a>h3");
            const userText = await usersNames.textContent();

            if(userText === username){
                await usersLocator.nth(i).locator(">:last-child").click();
                break;
            }
        }
    }
}
module.exports = {CommunityPage};
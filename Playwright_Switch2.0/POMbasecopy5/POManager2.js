const{LoginPage} = require('./LoginPage');
const {DashboardPage}=require('./DashboardPage');
const {CommunityPage}=require('./CommunityPage');
const {UserProfilePage}=require('./UserProfilePage');

class POManager2{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.comPage = new CommunityPage(this.page);
        this.userProfilePage = new UserProfilePage(this.page);
    }

getLoginPage(){
    return this.loginPage;
}
getCommunityPage(){
return this.comPage;
}
getUserProfilePage(){
return this.userProfilePage;
}
getDashboardPage(){
return this.dashboardPage;
}
}
module.exports = {POManager2};
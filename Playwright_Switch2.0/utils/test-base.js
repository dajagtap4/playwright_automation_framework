const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
testDataForOrder :    {
    username : "anshika@gmail.com",
    password : "Iamking@000",
    productName:"ADIDAS ORIGINAL"
    
    },
testDataForOrder2 :    {
    username : "jagtapda2019@gmail.com",
    password : "Deepak@1994",
    productName:"ADIDAS ORIGINAL"
}
}
)





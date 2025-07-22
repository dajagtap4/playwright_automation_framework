const { test, expect } = require('@playwright/test');

test('env handling using dotenv', async ({ page }) => {

    console.log(`base-url of ${process.env.ENV} env is -> `,process.env.BASE_URL);
    console.log(`username of ${process.env.ENV} env is -> `,process.env.USERNAME);
    console.log(`pass of ${process.env.ENV} env is -> `,process.env.PASSWORD);
    console.log(`city of ${process.env.ENV} env is -> `,process.env.CITY);
    
}); 
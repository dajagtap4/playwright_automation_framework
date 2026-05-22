const { test, expect } = require('../../../src/fixtures/test.fixture');


test.describe('@regression @dashboard Dashboard flows', () => {
 test('@smoke TC-DASH-001: Dashboard renders product catalog after login', async ({ loggedInPages }) => {
   const { dashboardPage } = loggedInPages;

   await expect(dashboardPage.page, 'Should land on the dashboard route').toHaveURL(/\/dashboard/);
   await expect(
     dashboardPage.productCards.first(),
     'At least one product card should be visible',
   ).toBeVisible();

   const titles = await dashboardPage.getAllProductTitles();
   expect(titles.length, 'Dashboard should expose multiple products').toBeGreaterThan(0);
   expect(titles.every((t) => t && t.trim().length > 0), 'Every product should have a non-empty title').toBe(true);
 });


 test('TC-DASH-002: Cart and Orders navigation are visible on dashboard', async ({ loggedInPages }) => {
   const { dashboardPage } = loggedInPages;

   await expect(dashboardPage.cartNav, 'Cart nav should be visible').toBeVisible();
   await expect(dashboardPage.ordersNav, 'Orders nav should be visible').toBeVisible();
 });


 test('TC-DASH-003: Adding a product navigates to cart with that product', async ({ loggedInPages }) => {
   const { dashboardPage, cartPage } = loggedInPages;
   const productName = 'ZARA COAT 3';

   await dashboardPage.addProductToCart(productName);
   await dashboardPage.goToCart();

   await expect(cartPage.page, 'Should be on the cart route').toHaveURL(/\/dashboard\/cart/);
   await cartPage.expectProductInCart(productName);
 });


 test('TC-DASH-004: Unknown product name surfaces a clear error', async ({ loggedInPages }) => {
   const { dashboardPage } = loggedInPages;

   await expect(
     dashboardPage.addProductToCart('NON_EXISTENT_PRODUCT_XYZ'),
     'Adding an unknown product should reject with a descriptive error',
   ).rejects.toThrow(/not found on dashboard/);
 });


 test('TC-DASH-005: Orders nav opens the order history page', async ({ loggedInPages }) => {
   const { dashboardPage } = loggedInPages;

   await dashboardPage.goToOrders();

   await expect(dashboardPage.page, 'Should navigate to the orders route').toHaveURL(/\/myorders/);
 });
});






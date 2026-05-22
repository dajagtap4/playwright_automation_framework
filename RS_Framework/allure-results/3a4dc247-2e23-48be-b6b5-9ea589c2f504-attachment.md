# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\dashboard\dashboard.spec.js >> @regression @dashboard Dashboard flows >> TC-DASH-003: Adding a product navigates to cart with that product
- Location: tests\e2e\dashboard\dashboard.spec.js:31:2

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | const { BasePage } = require('./BasePage');
  3  | 
  4  | class CartPage extends BasePage {
  5  |  constructor(page) {
  6  |    super(page);
  7  |    this.cartItems = page.locator('div li');
  8  |    this.checkoutButton = page.locator('text=Checkout');
  9  |  }
  10 | 
  11 | 
  12 |  productByName(productName) {
  13 |    return this.page.locator(`h3:has-text("${productName}")`);
  14 |  }
  15 | 
  16 | 
  17 |  async waitForCartLoaded() {
> 18 |    await this.cartItems.first().waitFor();
     |                                 ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  19 |  }
  20 | 
  21 | 
  22 |  async expectProductInCart(productName) {
  23 |    this.log.info(`Verifying product in cart: "${productName}"`);
  24 |    await this.waitForCartLoaded();
  25 |    await expect(this.productByName(productName)).toBeVisible();
  26 |  }
  27 | 
  28 | 
  29 |  async checkout() {
  30 |    this.log.info('Proceeding to checkout');
  31 |    await this.checkoutButton.click();
  32 |    await this.waitForLoad();
  33 |  }
  34 | }
  35 | 
  36 | 
  37 | module.exports = { CartPage };
  38 | 
  39 | 
  40 | 
```
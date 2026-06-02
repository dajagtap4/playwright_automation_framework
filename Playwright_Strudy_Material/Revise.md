# Playwright Interview Notes
> All topics in one file — no need to open files one by one

---

## Table of Contents
1. [Locators](#1-locators)
2. [Assertions](#2-assertions)
3. [API Testing](#3-api-testing)
4. [Date Picker](#4-date-picker)
5. [Dropdowns](#5-dropdowns)
6. [Dialog Handling (Alert, Confirm, Prompt)](#6-dialog-handling)
7. [Frames / iFrames](#7-frames--iframes)
8. [Keyboard Actions](#8-keyboard-actions)
9. [Mouse Actions](#9-mouse-actions)
10. [Scroll Page](#10-scroll-page)
11. [Screenshots](#11-screenshots)
12. [File Upload](#12-file-upload)
13. [Page Object Model (POM)](#13-page-object-model-pom)
14. [DemoBlaze E2E Test](#14-demoblaze-e2e-test)
15. [Test Hooks](#15-test-hooks)

---

## 1. Locators

### Types of Locators

```typescript
// By tag name
await page.locator('input').first().fill("deepak")

// By placeholder
await page.locator('[placeholder="Last Name"]').fill("abc")

// By XPath
await page.locator('//*[@id="username"]').fill("admin")

// By CSS class
await page.locator('.classname').click()

// By ID
await page.locator('#elementId').click()
```

### User Facing Locators (Recommended by Playwright)

```typescript
await page.getByRole('button', { name: "Submit" }).click()
await page.getByLabel('Address').fill("abc")
await page.getByPlaceholder('Address').fill("abc")
await page.getByText('Address').click()
```

### Interview Q&A
- **Q: What locators does Playwright support?**
  A: CSS, XPath, text, role, label, placeholder, test-id
- **Q: Which locators are recommended?**
  A: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText` — they are user-facing and more stable

---

## 2. Assertions

```typescript
import { test, expect } from '@playwright/test';

// Hard assertion — stops test on failure
await expect(page).toHaveTitle(/Playwright/)
await expect(page).toHaveURL("https://playwright.dev/")
await expect(page.locator('selector')).toBeVisible()

// Soft assertion — test continues even if this fails
await expect.soft(page).toHaveURL("https://playwright.dev/")
```

### Interview Q&A
- **Q: What is the difference between hard and soft assertions?**
  A: Hard assertion stops test execution on failure. Soft assertion logs the failure but continues running the remaining steps.
- **Q: How do you check page title?**
  A: `await expect(page).toHaveTitle(/Playwright/)`

---

## 3. API Testing

```typescript
import { expect, test } from '@playwright/test'

var userid;

// GET Request
test('apiGet', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2')
    expect(response.status()).toBe(200)
})

// POST Request
test('apiPost', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: { "name": "Deepak", "job": "QA" },
        headers: { "Accept": "application/json" }
    })
    expect(response.status()).toBe(201)
    var ser = await response.json()
    userid = ser.id
})

// PUT Request
test('apiPut', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/' + userid, {
        data: { "name": "Deepak", "job": "Billionaire" },
        headers: { "Accept": "application/json" }
    })
    expect(response.status()).toBe(200)
})

// DELETE Request
test('apiDelete', async ({ request }) => {
    await request.delete('https://reqres.in/api/users/' + userid)
})
```

### Interview Q&A
- **Q: Can Playwright do API testing?**
  A: Yes, using the `request` fixture — supports GET, POST, PUT, PATCH, DELETE
- **Q: What status code is returned for POST?**
  A: Usually 201 (Created)
- **Q: How do you pass body in POST request?**
  A: Using `data: {}` inside the request options

---

## 4. Date Picker

### Three Approaches

```typescript
// Approach 1: While loop — navigate month by month
test('while loop datePicker', async ({ page }) => {
    const year = "2023", month = "February", date = "20"
    await page.click("#datepicker")

    while (true) {
        const currentYear = await page.locator('.ui-datepicker-year').textContent()
        const currentMonth = await page.locator('.ui-datepicker-month').textContent()
        if (currentYear == year && currentMonth == month) break
        await page.locator('[title="Prev"]').click()
    }
    const dates = await page.$$(".ui-state-default")
    for (const dt of dates) {
        if (await dt.textContent() == date) { await dt.click(); break }
    }
})

// Approach 2: XPath click directly
await page.click(`//a[@class='ui-state-default'][text()='${date}']`)

// Approach 3: Simplest — fill directly
await page.fill('#datepicker', '03/15/2023')
```

### Interview Q&A
- **Q: How do you handle date pickers in Playwright?**
  A: Three ways — while loop navigation, XPath direct click, or direct fill if input is editable
- **Q: Which approach is best?**
  A: Direct fill (`page.fill`) is simplest. Use while loop when calendar navigation is required.

---

## 5. Dropdowns

```typescript
// Select by label (visible text)
await page.locator('select').selectOption({ label: 'Canada' })

// Select by value attribute
await page.locator('select').selectOption({ value: 'uk' })

// Select by index
await page.locator('select').selectOption({ index: 4 })

// Select by visible text directly
await page.selectOption('select', 'India')

// Validate count of options
await expect(page.locator('select option')).toHaveCount(10)

// Loop through options to find and select
const options = await page.$$('select option')
for (const option of options) {
    const text = await option.textContent()
    if (text?.includes('Canada')) {
        await page.selectOption('select', { label: text })
        break
    }
}
```

### Interview Q&A
- **Q: How do you select a dropdown value in Playwright?**
  A: Using `selectOption()` — by label, value, or index
- **Q: How do you verify dropdown options count?**
  A: `await expect(page.locator('select option')).toHaveCount(10)`

---

## 6. Dialog Handling

```typescript
// Alert
test('alert', async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe("I am an alert box!")
        await dialog.accept()
    })
    await page.click('#alertButton')
})

// Confirm Dialog
test('confirm', async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain("Press a button")
        await dialog.accept()
    })
    await page.click('#confirmButton')
    await expect(page.locator('#result')).toHaveText("You pressed OK!")
})

// Prompt Dialog
test('prompt', async ({ page }) => {
    page.on('dialog', async dialog => {
        await dialog.accept("John")  // enter value in prompt
    })
    await page.click('#promptButton')
    await expect(page.locator('#result')).toHaveText("Hello John! How are you today?")
})
```

### Interview Q&A
- **Q: How do you handle alerts in Playwright?**
  A: Using `page.on('dialog', ...)` event listener — then `dialog.accept()` or `dialog.dismiss()`
- **Q: How do you enter text in a prompt dialog?**
  A: `await dialog.accept("your text")`
- **Q: What are the types of dialogs?**
  A: Alert, Confirm, Prompt, beforeunload

---

## 7. Frames / iFrames

```typescript
test('frames', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    // Access element inside iframe using frameLocator
    await page.frameLocator('#frame-one796456169')
              .locator('//*[@id="q2"]/table/tbody/tr[1]/td/label')
              .click()
})
```

### Interview Q&A
- **Q: How do you handle iFrames in Playwright?**
  A: Using `page.frameLocator('iframe-selector')` then chain `.locator()` inside it
- **Q: What is frameLocator?**
  A: It's a Playwright method that lets you interact with elements inside an iframe

---

## 8. Keyboard Actions

```typescript
test("keyboardActions", async ({ page }) => {
    await page.goto("https://gotranscript.com/text-compare")
    await page.locator('[name="text1"]').fill("Deepak jagtap")

    await page.keyboard.press('Control+A')   // Select All
    await page.keyboard.press('Control+C')   // Copy
    await page.keyboard.down('Tab')          // Press Tab key down
    await page.keyboard.up('Tab')            // Release Tab key
    await page.keyboard.press('Control+V')   // Paste
})
```

### Common Keyboard Keys
| Action | Code |
|--------|------|
| Select All | `Control+A` |
| Copy | `Control+C` |
| Paste | `Control+V` |
| Tab | `Tab` |
| Enter | `Enter` |
| Escape | `Escape` |
| Arrow Down | `ArrowDown` |

### Interview Q&A
- **Q: How do you perform keyboard actions in Playwright?**
  A: Using `page.keyboard.press()`, `page.keyboard.down()`, `page.keyboard.up()`
- **Q: Difference between `press` and `down/up`?**
  A: `press` = key down + key up together. `down/up` = separate control of press and release

---

## 9. Mouse Actions

### Hover
```typescript
test("mouseHover", async ({ page }) => {
    const desktops = page.locator("//nav[@id='menu']/div[2]/ul/li[1]/a[1]")
    const mac = page.locator("//nav[@id='menu']/div[2]/ul/li[1]/div[1]/div/ul/li[2]/a")

    await desktops.hover()
    await mac.hover()
})
```

### Right Click
```typescript
test("rightClick", async ({ page }) => {
    const element = page.locator("//div[@class='document']/p/span")
    await element.click({ button: "right" })
})
```

### Double Click
```typescript
await element.dblclick()
```

### Drag and Drop
```typescript
await page.dragAndDrop('#source', '#target')
// OR
await source.dragTo(target)
```

### Interview Q&A
- **Q: How do you right-click in Playwright?**
  A: `await element.click({ button: "right" })`
- **Q: How do you hover over an element?**
  A: `await element.hover()`
- **Q: How do you double-click?**
  A: `await element.dblclick()`

---

## 10. Scroll Page

```typescript
// Method 1: scroll using evaluate (JavaScript)
await page.evaluate(() => window.scrollBy(0, 250))        // scroll down 250px
await page.evaluate(() => window.scrollTo(0, 500))        // scroll to 500px from top
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)) // scroll to bottom

// Method 2: scroll element into view
const element = page.locator('#element-id')
await element.scrollIntoViewIfNeeded()

// Method 3: keyboard scroll
await page.keyboard.press('PageDown')   // one page down
await page.keyboard.press('ArrowDown')  // one line down
await page.keyboard.press('End')        // bottom of page
```

### Interview Q&A
- **Q: How do you scroll in Playwright?**
  A: Three ways — `page.evaluate()` with JS, `scrollIntoViewIfNeeded()`, or keyboard keys
- **Q: How do you scroll to bottom of page?**
  A: `await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))`

---

## 11. Screenshots

```typescript
// Full page screenshot
await page.screenshot({ path: 'tests/screenshots/screenshot.png' })

// Full page (including scrollable content)
await page.screenshot({ path: 'screenshot.png', fullPage: true })

// Element screenshot
await page.locator('#element').screenshot({ path: 'element.png' })
```

### Interview Q&A
- **Q: How do you take a screenshot in Playwright?**
  A: `await page.screenshot({ path: 'path/to/file.png' })`
- **Q: How to capture full page screenshot?**
  A: Add `fullPage: true` option

---

## 12. File Upload

```typescript
test("uploadFile", async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/FileUpload.html')

    // Set file using input element
    await page.locator('#input-4').setInputFiles('src/tests/uploadFiles/Java_Playwright.docx')

    await page.waitForTimeout(1000)
    await page.close()
})
```

### Interview Q&A
- **Q: How do you upload a file in Playwright?**
  A: Using `setInputFiles('filepath')` on the file input element
- **Q: Can you upload multiple files?**
  A: Yes — `setInputFiles(['file1.pdf', 'file2.pdf'])`

---

## 13. Page Object Model (POM)

### What is POM?
- Design pattern where each **page = one class**
- Locators and actions are kept inside the page class
- Test files just call the methods — clean and reusable

### Page Class Example
```typescript
// page-objects/loginPage.ts
import { Page } from '@playwright/test'

export class loginPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async loginToPage() {
        await this.page.click('#login2')
        await this.page.fill('#loginusername', 'testuser')
        await this.page.fill('#loginpassword', 'password')
        await this.page.click('button[onclick="logIn()"]')
    }
}
```

### Test File Using POM
```typescript
// tests/pageObject.spec.ts
import { test } from '@playwright/test'
import { loginPage } from '../../page-objects/loginPage'
import { logoutPage } from '../../page-objects/logoutPage'

test.beforeEach(async ({ page }) => {
    await page.goto("/")
    const login = new loginPage(page)
    await login.loginToPage()
})

test('myInfo', async ({ page }) => {
    const myinfo = new myInfo(page)
    await myinfo.saveMyInfo()
})

test.afterEach(async ({ page }) => {
    const logout = new logoutPage(page)
    await logout.logoutFromPage()
    await page.close()
})
```

### Interview Q&A
- **Q: What is Page Object Model?**
  A: Design pattern where each web page has a separate class containing its locators and actions. Tests call methods from these classes.
- **Q: Why use POM?**
  A: Code reuse, easy maintenance — if a locator changes, update only in one place
- **Q: How do you pass `page` to POM class?**
  A: Through the constructor — `constructor(page: Page)`

---

## 14. DemoBlaze E2E Test

Full end-to-end flow covering:
1. Login
2. Select product
3. Add to cart
4. Place order
5. Verify confirmation
6. Logout

```typescript
test('TC:004 - Place order and verify confirmation', async ({ page }) => {
    const login = new loginPage(page)
    const home = new homePage(page)
    const cart = new cartPage(page)
    const orderPlace = new placeOdrForm(page)
    const logout = new logoutPage(page)

    await login.loginToPage()
    await login.checkLoginFunctionality()
    await home.selectProductOnHomePage()
    await cart.checkAddToCartbuttonVisible()
    await cart.addToCartButton()
    await cart.cartUI()
    await cart.placeOrder()
    await orderPlace.fillPlaceOrderForm()
    await orderPlace.checkThankYouForYourPurchase()
    await orderPlace.oKButton()
    await logout.logoutFromPage()
})
```

---

## 15. Test Hooks

```typescript
test.beforeAll(async ({ page }) => {
    // Runs once before all tests in the file
})

test.beforeEach(async ({ page }) => {
    // Runs before every test
    await page.goto("https://example.com")
})

test.afterEach(async ({ page }) => {
    // Runs after every test
    await page.close()
})

test.afterAll(async ({ page }) => {
    // Runs once after all tests
})
```

### Interview Q&A
- **Q: What are hooks in Playwright?**
  A: `beforeAll`, `beforeEach`, `afterEach`, `afterAll` — used for setup and teardown
- **Q: Difference between beforeAll and beforeEach?**
  A: `beforeAll` runs once for all tests. `beforeEach` runs before every single test.

---

## Quick Reference Cheat Sheet

| Topic | Key Method |
|-------|-----------|
| Navigate | `page.goto(url)` |
| Click | `element.click()` |
| Type | `element.fill("text")` |
| Right Click | `element.click({ button: "right" })` |
| Double Click | `element.dblclick()` |
| Hover | `element.hover()` |
| Drag & Drop | `page.dragAndDrop(src, target)` |
| Dropdown | `element.selectOption({ label: 'x' })` |
| Upload File | `element.setInputFiles('path')` |
| Screenshot | `page.screenshot({ path: 'x.png' })` |
| iFrame | `page.frameLocator('iframe').locator('x')` |
| Dialog | `page.on('dialog', d => d.accept())` |
| Scroll | `page.evaluate(() => window.scrollTo(0, 500))` |
| API GET | `request.get(url)` |
| API POST | `request.post(url, { data: {} })` |
| Hard Assert | `expect(x).toBe(y)` |
| Soft Assert | `expect.soft(x).toBe(y)` |
| Wait | `page.waitForTimeout(1000)` |

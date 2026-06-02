# Playwright vs Selenium — Quick Reference Cheat Sheet

---

| Topic | Playwright | Selenium (Java) |
|-------|-----------|-----------------|
| **Navigate** | `page.goto(url)` | `driver.get(url)` |
| **Click** | `element.click()` | `element.click()` |
| **Type** | `element.fill("text")` | `element.sendKeys("text")` |
| **Clear** | `element.clear()` | `element.clear()` |
| **Right Click** | `element.click({ button: "right" })` | `Actions actions = new Actions(driver);` `actions.contextClick(element).perform()` |
| **Double Click** | `element.dblclick()` | `actions.doubleClick(element).perform()` |
| **Hover** | `element.hover()` | `actions.moveToElement(element).perform()` |
| **Drag & Drop** | `page.dragAndDrop(src, target)` | `actions.dragAndDrop(src, target).perform()` |
| **Dropdown** | `element.selectOption({ label: 'x' })` | `Select s = new Select(element);` `s.selectByVisibleText("x")` |
| **Upload File** | `element.setInputFiles('path')` | `element.sendKeys("absolute/path/to/file")` |
| **Screenshot** | `page.screenshot({ path: 'x.png' })` | `File src = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);` |
| **iFrame** | `page.frameLocator('iframe').locator('x')` | `driver.switchTo().frame("frameId")` |
| **Switch back from iFrame** | automatic | `driver.switchTo().defaultContent()` |
| **Dialog / Alert** | `page.on('dialog', d => d.accept())` | `driver.switchTo().alert().accept()` |
| **Dismiss Alert** | `page.on('dialog', d => d.dismiss())` | `driver.switchTo().alert().dismiss()` |
| **Get Alert Text** | `dialog.message()` | `driver.switchTo().alert().getText()` |
| **Scroll** | `page.evaluate(() => window.scrollTo(0, 500))` | `((JavascriptExecutor)driver).executeScript("window.scrollTo(0,500)")` |
| **Scroll to Element** | `element.scrollIntoViewIfNeeded()` | `((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView()", element)` |
| **API GET** | `request.get(url)` | Not built-in (use RestAssured) |
| **API POST** | `request.post(url, { data: {} })` | Not built-in (use RestAssured) |
| **Hard Assert** | `expect(x).toBe(y)` | `Assert.assertEquals(actual, expected)` |
| **Soft Assert** | `expect.soft(x).toBe(y)` | `SoftAssert sa = new SoftAssert();` `sa.assertEquals(actual, expected);` `sa.assertAll()` |
| **Wait (fixed)** | `page.waitForTimeout(1000)` | `Thread.sleep(1000)` |
| **Wait for element** | auto-wait built-in | `WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));` `wait.until(ExpectedConditions.visibilityOf(element))` |
| **Explicit Wait** | auto-wait built-in | `ExpectedConditions.elementToBeClickable(element)` |
| **Implicit Wait** | not needed | `driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10))` |
| **Get Text** | `await element.textContent()` | `element.getText()` |
| **Get Attribute** | `await element.getAttribute("href")` | `element.getAttribute("href")` |
| **Check Visible** | `await expect(element).toBeVisible()` | `element.isDisplayed()` |
| **Check Enabled** | `await expect(element).toBeEnabled()` | `element.isEnabled()` |
| **Check Selected** | `await expect(element).toBeChecked()` | `element.isSelected()` |
| **Browser Open** | auto via config | `WebDriver driver = new ChromeDriver()` |
| **Browser Close** | `page.close()` | `driver.quit()` |
| **New Tab / Window** | `page.context().newPage()` | `driver.switchTo().window(handle)` |
| **Get Page Title** | `await page.title()` | `driver.getTitle()` |
| **Get Current URL** | `await page.url()` | `driver.getCurrentUrl()` |
| **Refresh Page** | `await page.reload()` | `driver.navigate().refresh()` |
| **Go Back** | `await page.goBack()` | `driver.navigate().back()` |
| **Execute JS** | `page.evaluate(() => {...})` | `((JavascriptExecutor)driver).executeScript("...")` |
| **Keyboard Press** | `page.keyboard.press('Enter')` | `element.sendKeys(Keys.ENTER)` |
| **Find Element** | `page.locator('selector')` | `driver.findElement(By.id("id"))` |
| **Find Elements** | `page.locator('selector').all()` | `driver.findElements(By.className("x"))` |
| **By ID** | `page.locator('#id')` | `By.id("id")` |
| **By Class** | `page.locator('.class')` | `By.className("class")` |
| **By XPath** | `page.locator('//xpath')` | `By.xpath("//xpath")` |
| **By CSS** | `page.locator('css')` | `By.cssSelector("css")` |
| **By Text** | `page.getByText("text")` | `By.xpath("//*[text()='text']")` |
| **By Role** | `page.getByRole('button', {name:'x'})` | No direct equivalent |
| **Headless Mode** | config: `headless: true` | `ChromeOptions opts = new ChromeOptions();` `opts.addArguments("--headless")` |

---

## Locator Comparison

| Locator | Playwright | Selenium |
|---------|-----------|----------|
| ID | `#myId` | `By.id("myId")` |
| Class | `.myClass` | `By.className("myClass")` |
| XPath | `//div[@id='x']` | `By.xpath("//div[@id='x']")` |
| CSS | `div.class > span` | `By.cssSelector("div.class > span")` |
| Name | `[name='username']` | `By.name("username")` |
| Link Text | `page.getByText("Click here")` | `By.linkText("Click here")` |

---

## Wait Strategy Comparison

| Wait Type | Playwright | Selenium |
|-----------|-----------|----------|
| Auto Wait | Built-in (no code needed) | Not available |
| Fixed Wait | `page.waitForTimeout(2000)` | `Thread.sleep(2000)` |
| Wait for URL | `page.waitForURL('**/home')` | `wait.until(ExpectedConditions.urlContains("home"))` |
| Wait for Element | auto | `wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("x")))` |
| Wait for Text | `expect(el).toHaveText("x")` | `wait.until(ExpectedConditions.textToBe(By.id("x"), "x"))` |

---

## Key Differences — Interview Points

| Feature | Playwright | Selenium |
|---------|-----------|----------|
| Language | JS/TS, Python, Java, C# | Java, Python, C#, Ruby |
| Auto-wait | Yes — built-in | No — manual waits needed |
| API Testing | Yes — built-in | No — needs RestAssured |
| Speed | Faster | Slower |
| Browser Support | Chromium, Firefox, WebKit | Chrome, Firefox, Edge, Safari |
| Parallel Execution | Built-in | Needs TestNG/JUnit config |
| Setup | `npm install playwright` | Needs driver setup (ChromeDriver) |
| iFrame Handling | `frameLocator()` | `switchTo().frame()` |
| Shadow DOM | `locator('>> css')` | Complex — needs JS executor |
| Screenshots | Built-in | Needs TakesScreenshot cast |

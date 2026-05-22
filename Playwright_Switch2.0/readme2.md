# Boomi Playwright Framework - Beginner's Guide


---


## What is this?


This is an **automated testing framework** built using **Playwright** and **TypeScript**.


It opens a real browser, performs actions (click, type, navigate), and checks if the Boomi web application is working correctly — just like a human tester would, but automatically and much faster.


---


## Tech Stack


| Tool | Purpose |
|---|---|
| **TypeScript** | Programming language (typed JavaScript) |
| **Playwright** | Browser automation library |
| **dotenv** | Load environment config from `.env` files |
| **LambdaTest** | Cloud service to run tests on remote browsers |
| **AWS S3** | Store visual regression screenshots |
| **Axios / Superagent** | Make HTTP/API calls |
| **ESLint + Prettier** | Code quality and formatting |


---


## Project Folder Structure


```
boomi-playwright/
│
├── .env.qaplat           ← Environment config (URLs, credentials)
├── .env.sandbox          ← Another environment config
├── .env.prod             ← Production environment config
│   ... (19 total .env files)
│
├── playwright.config.ts  ← Main Playwright config (browser, timeouts, etc.)
│
├── src/
│   ├── index.ts          ← Fixtures setup (heart of the framework)
│   ├── pom/              ← Page Object Models (one class per page)
│   │   ├── BasePage.ts   ← Parent class all pages extend
│   │   ├── LoginPage.ts  ← Login page actions & selectors
│   │   ├── index.ts      ← Maps all page classes to fixture names
│   │   └── ...           ← 150+ page classes organized by module
│   ├── fixtures/
│   │   ├── lambda-test.ts      ← LambdaTest cloud browser setup
│   │   ├── visual-regression.ts← Screenshot comparison setup
│   │   └── runtime.ts          ← Boomi Atom/Molecule provisioning
│   ├── components/       ← Reusable UI components (masthead, popups)
│   ├── utils/
│   │   ├── env.ts        ← Maps .env values to typed class
│   │   ├── global_setup.ts ← Loads .env before tests run
│   │   └── core/         ← WebElement, Assertions, PageUtils
│   ├── api/              ← API clients for backend calls
│   └── constants/        ← Shared constants
│
├── tests/                ← All test files (*.spec.ts)
│   ├── login-page/
│   ├── marketplace/
│   ├── acp/
│   └── ...               ← 28+ test folders organized by feature
│
└── test-data/            ← Test data files
```


---


## Framework Flow (Step by Step)


```
Step 1: You run a command
       ↓
Step 2: global_setup.ts runs FIRST
       → Looks at ENVIRONMENT variable
       → Loads matching .env file (e.g. .env.qaplat)
       ↓
Step 3: playwright.config.ts is read
       → Sets browser, timeouts, retries, reporter
       → Points to globalSetup and test directory
       ↓
Step 4: Fixtures are prepared (src/index.ts)
       → Creates instances of all Page Object classes
       → Decides: local browser OR LambdaTest cloud?
       → Sets up screenshot-on-failure, visual matcher, etc.
       ↓
Step 5: Tests run (tests/**/*.spec.ts)
       → Test gets page objects injected automatically
       → Interacts with browser via POM methods
       → Makes assertions
       ↓
Step 6: Results saved
       → HTML report generated
       → Video saved if test failed
       → Screenshot attached if SCREENSHOT_ON_FAILURE is set
```


---


## Key Files Explained


### 1. `.env.qaplat` — Environment Config
```
BASE_URL = "https://qa.boomi.com/"
USER_NAME = "boomitester1+jboomi1@gmail.com"
PASSWORD = "S3rusN0H4kk@5"
LAMBDA_ENABLED = "false"
```
- Tells the framework **which website** to test and **which user** to login as
- There are 19 such files — one per environment (qa, sandbox, prod, etc.)


---


### 2. `src/utils/global_setup.ts` — Runs Before Everything
```typescript
dotenv.config({
 path: `.env.${process.env.ENVIRONMENT ?? "qaplat"}`,
 override: true,
});
```
- Runs **once** before any test starts
- Loads the correct `.env` file based on `ENVIRONMENT` variable
- Default environment is `qaplat` if nothing is specified


---


### 3. `src/utils/env.ts` — Typed Access to Config
```typescript
ENV.BASE_URL      // "https://qa.boomi.com/"
ENV.USER_NAME     // "boomitester1@gmail.com"
ENV.LAMBDA_ENABLED // "false"
```
- Makes all `.env` values available as a typed class
- Instead of `process.env.BASE_URL` everywhere, you use `ENV.BASE_URL`


---


### 4. `playwright.config.ts` — Test Runner Settings


| Setting | Value | Meaning |
|---|---|---|
| `testDir` | `./tests` | Where test files live |
| `testMatch` | `*.spec.ts` | Only run `.spec.ts` files |
| `fullyParallel` | `false` | Run tests one at a time |
| `timeout` | 15 minutes | Max time per test |
| `actionTimeout` | 90 seconds | Max time per browser action |
| `headless` | `false` | Browser window is visible |
| `video` | `retain-on-failure` | Record video only on failure |
| `globalSetup` | `global_setup.ts` | File to run before tests |


---


### 5. `src/pom/BasePage.ts` — Parent of All Pages
```typescript
export class BasePage {
 readonly page: Page;
 readonly pageUtils: PageUtils;


 constructor(page: Page, context: BrowserContext) {
   this.page = page;
   this.pageUtils = new PageUtils(page);
 }


 async navigateToURL(url: string) {
   await this.page.goto(url);
 }
}
```
- Every page class **extends** BasePage
- Provides shared methods: `navigateToURL`, `waitForLoadState`, dark/light mode helpers


---


### 6. `src/pom/` — Page Object Models (POM)


Each file = one page or section of the app.


```typescript
// Example: LoginPage.ts
export class LoginPage extends BasePage {
 readonly EMAIL_INPUT: WebElement;
 readonly SIGN_IN_BUTTON: WebElement;


 constructor(page, context) {
   super(page, context);
   this.EMAIL_INPUT = new WebElement(page, page.locator('#email'), 'Email Input');
   this.SIGN_IN_BUTTON = new WebElement(page, page.locator('#signIn'), 'Sign In Button');
 }


 async login(email: string, password: string) {
   await this.EMAIL_INPUT.fill(email);
   await this.SIGN_IN_BUTTON.click();
 }
}
```


There are **150+ page classes** covering all modules:
- Login, Marketplace, ACP, CAM, AI Registry, Agent Garden
- Spaces, Submissions, Publisher, Help, Developer docs, etc.


---


### 7. `src/pom/index.ts` — The Page Object Map


This file **maps all page classes to fixture names**:
```typescript
export const PageObjectMap = {
 loginPage: LoginPage,
 marketPlacePage: MarketPlacePage,
 acpHomePage: ACPHomePage,
 // ... 150+ entries
}
```
This is how `loginPage` becomes available automatically in every test.


---


### 8. `src/index.ts` — Fixtures (The Heart)


Fixtures are **auto-injected helpers** available in every test.


```typescript
const test = BaseTest.extend({
 // Auto-creates all page objects from PageObjectMap
 ...fixtures,


 // Decides: local browser or LambdaTest cloud
 page: isLambdaEnv() ? ltPage : localPage,


 // Visual screenshot comparison
 visualMatcher,


 // Provisions Boomi Atoms for integration tests
 runtimeManager,


 // Auto-runs after every test — captures screenshot on failure
 globalAfterEach: [async ({ page }, use, testInfo) => { ... }, { auto: true }],
});
```


---


### 9. `src/fixtures/lambda-test.ts` — Cloud Browser


When `LAMBDA_ENABLED=true`, instead of opening a local browser, it connects to **LambdaTest cloud**:
```typescript
browser = await chromium.connect(
 `ws://cdp.lambdatest.com/playwright?capabilities=...`
);
```
- Runs on a real browser in the cloud
- Records video, network logs, console logs
- Reports test pass/fail status back to LambdaTest


---


## How to Write a Test (Beginner Example)


```typescript
// tests/login-page/login.spec.ts


import { test } from "@src/index";            // import custom test
import ENV from "@src/utils/env";              // import env config


test("User can login successfully", async ({ loginPage }) => {
 // Step 1: Navigate to login page
 await loginPage.navigateToURL(ENV.BASE_URL);


 // Step 2: Perform login
 await loginPage.login(ENV.USER_NAME, ENV.PASSWORD);


 // Step 3: Assert user is logged in
 await loginPage.verifyDashboardVisible();
});
```


Notice:
- `loginPage` is **automatically injected** — no need to create it
- `ENV.BASE_URL` comes from the `.env` file
- The test describes **what** to do, not **how** to find elements (that's in the POM)


---


## How to Run Tests


```bash
# Run a specific test file
npx playwright test tests/login-page/login.spec.ts


# Run on a specific environment
ENVIRONMENT=sandbox npx playwright test


# Run with browser visible
ENVIRONMENT=qaplat npx playwright test


# View HTML report after run
npm run report
```


---


## Local vs Cloud Execution


| Mode | How | When |
|---|---|---|
| **Local** | `LAMBDA_ENABLED=false` | Development / debugging |
| **LambdaTest Cloud** | `LAMBDA_ENABLED=true` | CI/CD pipeline runs |


---


## Test Annotations (Jira linking)


```typescript
test("My test",
 { annotation: testCaseAnnotation(["UU-5359"]) },
 async ({ loginPage }) => { ... }
);
```
Links the test to a Jira ticket: `https://boomii.atlassian.net/browse/UU-5359`


---


## Summary


```
.env file          → Which URL + credentials to use
global_setup.ts    → Load .env before tests start
playwright.config  → Browser settings, timeouts, reporters
BasePage.ts        → Shared methods for all pages
pom/*.ts           → Page-specific selectors and actions
pom/index.ts       → Register all pages as fixtures
src/index.ts       → Wire everything together as test fixtures
tests/*.spec.ts    → Actual test cases
HTML Report        → Results after tests run
```


> **Golden Rule:** Tests should be simple and readable.
> All the complex browser interaction logic lives in Page Objects (POM).
> Tests just call POM methods and assert results.





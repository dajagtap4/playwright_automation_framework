# Playwright Test Automation Framework


A scalable, TypeScript-based end-to-end test automation framework built with [Playwright](https://playwright.dev/), following the **Page Object Model (POM)** design pattern with custom fixtures for dependency injection.


---


## Table of Contents


- [Framework Overview](#framework-overview)
- [Architecture Diagram](#architecture-diagram)
- [Directory Structure](#directory-structure)
- [Component Flow Diagram](#component-flow-diagram)
- [Fixture System](#fixture-system)
- [Page Objects](#page-objects)
- [Utilities](#utilities)
- [Test Data Management](#test-data-management)
- [Configuration](#configuration)
- [How Everything Integrates](#how-everything-integrates)
- [Running Tests](#running-tests)
- [Reports](#reports)


---


## Framework Overview


| Property        | Value                              |
|-----------------|------------------------------------|
| Language        | TypeScript                         |
| Test Runner     | Playwright Test                    |
| Design Pattern  | Page Object Model (POM)            |
| Base URL        | https://practicetestautomation.com |
| Parallel Workers| 3                                  |
| Retry on Fail   | 1                                  |
| Browsers        | Chromium                           |


---


## Architecture Diagram


```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PLAYWRIGHT FRAMEWORK                             │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    playwright.config.ts                          │   │
│  │  baseURL · timeout · retries · workers · reporters · browser    │   │
│  └──────────────────────────┬──────────────────────────────────────┘   │
│                             │ configures                                │
│                             ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                   fixtures/baseFixture.ts                         │  │
│  │                                                                   │  │
│  │   extends Playwright base test with custom Page Object fixtures  │  │
│  │                                                                   │  │
│  │   { loginPage }  ──────────────────►  pages/LoginPage.ts        │  │
│  │   { homePage }   ──────────────────►  pages/HomePage.ts         │  │
│  └──────────────────────────┬──────────────────────────────────────┘  │
│                             │ injects into                              │
│                             ▼                                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    tests/login/login.spec.ts                      │  │
│  │                                                                   │  │
│  │   test('Verify Login', async ({ page, loginPage, homePage })) {  │  │
│  │       await page.goto('/practice-test-login/')                   │  │
│  │       await loginPage.login(user, pass)      ◄── test-data/     │  │
│  │       await homePage.verifySuccessfulLogin()                     │  │
│  │   })                                                             │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌─────────────────────────┐    │
│  │ utils/       │   │ test-data/   │   │ playwright-report/       │    │
│  │ logger.ts    │   │ users.json   │   │ index.html               │    │
│  │ apiHelper.ts │   │              │   │                          │    │
│  │ environment.ts│  └──────────────┘   └─────────────────────────┘    │
│  └──────────────┘                                                       │
└─────────────────────────────────────────────────────────────────────────┘
```


---


## Directory Structure


```
Playwright_Framework_/
│
├── fixtures/
│   └── baseFixture.ts          # Custom test fixture — extends Playwright test
│                               # with POM page objects (loginPage, homePage)
│
├── pages/
│   ├── LoginPage.ts            # Page Object for login page
│   ├── HomePage.ts             # Page Object for home/dashboard page
│   └── test-data/
│       └── users.json          # (unused) page-level test data
│
├── tests/
│   └── login/
│       └── login.spec.ts       # Login feature test suite
│
├── test-data/
│   └── users.json              # Test credentials (admin user)
│
├── utils/
│   ├── logger.ts               # Singleton logger with info/error methods
│   ├── apiHelper.ts            # Playwright API request context factory
│   └── environment.ts          # dotenv-based environment variable loader
│
├── test-results/               # Auto-generated — screenshots, videos, traces
│   └── .last-run.json
│
├── playwright-report/          # Auto-generated — HTML test report
│   └── index.html
│
├── playwright.config.ts        # Global Playwright configuration
└── package.json                # Dependencies and NPM scripts
```


---


## Component Flow Diagram


```
Test Execution Flow
───────────────────


 npm test
     │
     ▼
 playwright.config.ts
 ┌────────────────────────────────────┐
 │  • Sets baseURL                    │
 │  • Sets timeout (30s)              │
 │  • Sets workers (3 parallel)       │
 │  • Sets retries (1)                │
 │  • Configures HTML + list reporter │
 │  • Points testDir → ./tests        │
 └──────────────────┬─────────────────┘
                    │
                    ▼
 Playwright discovers tests/login/login.spec.ts
                    │
                    ▼
 login.spec.ts imports { test } from baseFixture
 ┌────────────────────────────────────┐
 │  baseFixture.ts                    │
 │                                    │
 │  test.extend({                     │
 │    loginPage: async ({ page }) =>  │◄──── new LoginPage(page)
 │    homePage:  async ({ page }) =>  │◄──── new HomePage(page)
 │  })                                │
 └──────────────────┬─────────────────┘
                    │
                    ▼
 test('Verify Login', async ({ page, loginPage, homePage }))
 ┌────────────────────────────────────────────────────────┐
 │                                                        │
 │  1. page.goto('/practice-test-login/')                 │
 │         │                                              │
 │         ▼                                              │
 │  2. loginPage.login(users.admin.username, password)    │
 │         │                                              │
 │         │   LoginPage.ts                               │
 │         │   ┌──────────────────────────────────┐      │
 │         └──►│  fill #username                  │      │
 │             │  fill #password                  │      │
 │             │  click #submit                   │      │
 │             └──────────────────────────────────┘      │
 │         │                                              │
 │         ▼                                              │
 │  3. homePage.verifySuccessfulLogin()                   │
 │         │                                              │
 │         │   HomePage.ts                                │
 │         │   ┌──────────────────────────────────┐      │
 │         └──►│  expect(h1.post-title)            │      │
 │             │    .toHaveText('Logged In...')    │      │
 │             └──────────────────────────────────┘      │
 │                                                        │
 └────────────────────────────────────────────────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │   Test Results          │
        │   • Pass/Fail status    │
        │   • HTML Report         │
        │   • Screenshots (fail)  │
        │   • Videos (fail)       │
        │   • Traces (fail)       │
        └─────────────────────────┘
```


---


## Fixture System


Fixtures are the backbone of this framework. They act as a **dependency injection** system — page objects are created once per test and automatically disposed.


**File:** `fixtures/baseFixture.ts`


```
Playwright base test
       │
       │  test.extend({...})
       ▼
Custom baseFixture
       │
       ├── loginPage fixture ──► new LoginPage(page)
       └── homePage fixture  ──► new HomePage(page)


Tests consume:
 async ({ page, loginPage, homePage }) => { ... }
        │         │            │
        │         │            └── from fixtures/baseFixture.ts
        │         └──────────────── from fixtures/baseFixture.ts
        └────────────────────────── Playwright built-in
```


**How to add a new fixture:**


```typescript
// fixtures/baseFixture.ts
import { NewPage } from '../pages/NewPage';


export const test = base.extend<{
 loginPage: LoginPage;
 homePage: HomePage;
 newPage: NewPage;          // 1. Add type
}>({
 newPage: async ({ page }, use) => {
   await use(new NewPage(page));  // 2. Add factory
 },
});
```


---


## Page Objects


Page Objects encapsulate all selectors and interactions for a specific page/component.


### LoginPage (`pages/LoginPage.ts`)


```
LoginPage
   │
   ├── Properties
   │   ├── page          — Playwright Page instance
   │   ├── username      — Locator → #username
   │   ├── password      — Locator → #password
   │   └── submitButton  — Locator → #submit
   │
   └── Methods
       └── login(user, pass)
               │
               ├── fill username field
               ├── fill password field
               └── click submit button
```


### HomePage (`pages/HomePage.ts`)


```
HomePage
   │
   ├── Properties
   │   ├── page            — Playwright Page instance
   │   └── successMessage  — Locator → h1.post-title
   │
   └── Methods
       └── verifySuccessfulLogin()
               │
               └── expect(successMessage).toHaveText('Logged In...')
```


---


## Utilities


### Logger (`utils/logger.ts`)


Singleton utility for structured console output.


```
Logger (static class)
   │
   ├── static info(message: string)
   │       └── console.log('[INFO] ' + message)
   │
   └── static error(message: string)
           └── console.error('[ERROR] ' + message)


Usage:
   Logger.info('Login test started');
   Logger.error('Element not found');
```


---


### API Helper (`utils/apiHelper.ts`)


Factory function for creating Playwright API request contexts for API-level testing.


```
createApiContext()
   │
   └── playwright.request.newContext({
           baseURL: 'https://reqres.in'
       })
       │
       └── Returns: APIRequestContext
               │
               └── Can be used for:
                   ├── GET /api/users
                   ├── POST /api/login
                   └── Any REST API calls
```


**Usage in tests:**


```typescript
import { createApiContext } from '../../utils/apiHelper';


test('API test', async () => {
 const api = await createApiContext();
 const response = await api.get('/api/users?page=2');
 expect(response.status()).toBe(200);
});
```


---


### Environment (`utils/environment.ts`)


Loads environment variables via `dotenv` for environment-specific configuration.


```
environment.ts
   │
   ├── loads .env file (dotenv)
   │
   └── exports env object
           │
           └── baseUrl: process.env.BASE_URL || ''
```


**`.env` file example (create in root):**


```
BASE_URL=https://practicetestautomation.com
```


---


## Test Data Management


```
test-data/
   └── users.json
           │
           └── {
                 "admin": {
                   "username": "<admin-user>",
                   "password": "<admin-pass>"
                 }
               }


How it's consumed in tests:
   import users from '../../test-data/users.json';
   await loginPage.login(users.admin.username, users.admin.password);
```


> **Note:** `pages/test-data/users.json` exists but is not imported anywhere. All tests should use `test-data/users.json` at the root level.


---


## Configuration


**File:** `playwright.config.ts`


```
playwright.config.ts
│
├── testDir          → ./tests
├── timeout          → 30,000ms (per test)
├── expect.timeout   → 5,000ms  (per assertion)
├── retries          → 1 (retry failed tests once)
├── workers          → 3 (parallel test workers)
│
├── use (global browser settings)
│   ├── baseURL        → https://practicetestautomation.com
│   ├── screenshot     → only-on-failure
│   ├── video          → retain-on-failure
│   └── trace          → retain-on-failure
│
├── reporter
│   ├── html           → playwright-report/index.html
│   └── list           → console output
│
└── projects
   └── chromium (Desktop Chrome)
```


---


## How Everything Integrates


```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INTEGRATION MAP                                        │
│                                                                             │
│   playwright.config.ts                                                      │
│          │                                                                  │
│          │ sets global config (baseURL, timeouts, browser)                  │
│          │                                                                  │
│          ▼                                                                  │
│   tests/login/login.spec.ts ◄── imports ── fixtures/baseFixture.ts         │
│          │                                         │                        │
│          │                                         ├── pages/LoginPage.ts  │
│          │                                         └── pages/HomePage.ts   │
│          │                                                                  │
│          ├── imports ──► test-data/users.json  (credentials)               │
│          │                                                                  │
│          │ (available but not yet wired into tests)                         │
│          ├── utils/logger.ts      (logging)                                 │
│          ├── utils/apiHelper.ts   (API testing)                             │
│          └── utils/environment.ts (env vars via .env)                       │
│                                                                             │
│   On test run:                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │  test-results/  ←─ artifacts (screenshots, videos, traces) on fail  │ │
│   │  playwright-report/index.html ←─ HTML report after every run        │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```


---


## Running Tests


```bash
# Install dependencies
npm install


# Install Playwright browsers
npx playwright install


# Run all tests (headless)
npm test


# Run in Chromium (headed/visible browser)
npm run chrome


# Run in headed mode
npm run headed


# Run in debug mode (step through tests)
npm run debug


# View HTML report
npm run report
```


### Run a specific test file


```bash
npx playwright test tests/login/login.spec.ts
```


### Run tests matching a title


```bash
npx playwright test --grep "Verify Login"
```


---


## Reports


After each run, Playwright generates:


```
playwright-report/
   └── index.html      ◄── Open in browser: npm run report


test-results/
   ├── .last-run.json  ◄── Last run metadata (pass/fail status)
   ├── */screenshot.png ◄── Captured on failure
   ├── */video.webm     ◄── Captured on failure
   └── */trace.zip      ◄── Open with: npx playwright show-trace trace.zip
```


---


## Adding New Tests — Quick Guide


```
1. Create a Page Object
  pages/YourPage.ts
      └── class YourPage { constructor(page), locators, methods }


2. Register it as a fixture
  fixtures/baseFixture.ts
      └── yourPage: async ({ page }, use) => { await use(new YourPage(page)) }


3. Add test data (if needed)
  test-data/your-data.json


4. Write the test
  tests/your-feature/your-feature.spec.ts
      └── import { test } from '../../fixtures/baseFixture'
          import data from '../../test-data/your-data.json'
          test('...', async ({ page, yourPage }) => { ... })
```


---


## Tech Stack


| Tool                | Version    | Purpose                          |
|---------------------|------------|----------------------------------|
| `@playwright/test`  | ^1.60.0    | Test runner + browser automation |
| `typescript`        | ^6.0.3     | Type-safe JavaScript             |
| `ts-node`           | ^10.9.2    | Run TypeScript directly          |
| `dotenv`            | ^17.4.2    | Load `.env` environment files    |




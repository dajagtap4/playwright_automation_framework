# Client App — Playwright Automation Framework


A production-grade Playwright + JavaScript automation framework built around the
Page Object Model, custom fixtures, environment-driven configuration, and
multi-format reporting (HTML, JUnit, Allure).


This framework was extracted and refactored from the
`ClientAppPO_Parameterization.spec.js` reference suite.


---


## Tech Stack


| Layer              | Tooling                                           |
| ------------------ | ------------------------------------------------- |
| Test runner        | [@playwright/test](https://playwright.dev)        |
| Language           | JavaScript (Node 18+, CommonJS)                   |
| Pattern            | Page Object Model + Fixtures + Manager            |
| Config             | dotenv per environment (`env/.env.<env>`)         |
| Reporting          | HTML, JUnit, Allure                               |
| Quality            | ESLint, Prettier                                  |
| CI                 | GitHub Actions                                    |


---


## Folder Structure


```
ClientAppPO_Framework/
├─ env/                       # Per-environment dotenv files (gitignored where sensitive)
│  ├─ .env.dev
│  ├─ .env.qa
│  ├─ .env.prod
│  └─ .env.example
├─ src/
│  ├─ config/
│  │  └─ env.config.js        # Loads env file, exposes typed config object
│  ├─ data/
│  │  └─ placeOrder.data.json # Test data sets
│  ├─ fixtures/
│  │  └─ test.fixture.js      # Custom Playwright fixtures (pages, loggedInPages)
│  ├─ pages/
│  │  ├─ BasePage.js
│  │  ├─ LoginPage.js
│  │  ├─ DashboardPage.js
│  │  ├─ CartPage.js
│  │  ├─ OrderReviewPage.js
│  │  ├─ OrderHistoryPage.js
│  │  └─ PageManager.js
│  └─ utils/
│     ├─ logger.js
│     └─ dataLoader.js
├─ tests/
│  └─ e2e/
│     └─ orders/
│        └─ placeOrder.parameterized.spec.js
├─ .github/workflows/playwright.yml
├─ playwright.config.js
├─ package.json
├─ .eslintrc.json
├─ .prettierrc.json
└─ README.md
```


---


## Getting Started


### 1. Prerequisites
- Node.js 18+ (a `.nvmrc` is provided for `nvm use`)


### 2. Install
```bash
npm ci
npx playwright install --with-deps
```


### 3. Configure environments
Copy `env/.env.example` to `env/.env.<env>` (or edit the included
`.env.qa`, `.env.dev`, `.env.prod`) and provide values for:
- `BASE_URL` — Application under test
- `USER_EMAIL`, `USER_PASSWORD` — Default test user
- Optional timeouts, retries, workers, headless flag


### 4. Run
```bash
# default = qa
npm test


# explicit env
npm run test:dev
npm run test:qa
npm run test:prod


# by tag
npm run test:smoke
npm run test:regression


# only the parameterized order suite
npm run test:orders


# debug / UI / headed
npm run test:headed
npm run test:debug
npm run test:ui
```


### 5. Reports
```bash
npm run report:html      # opens the Playwright HTML report
npm run report:allure    # generates and opens the Allure report
```


---


## How the framework is organised


### Page Object Model
Every page extends `BasePage` which provides:
- a scoped `logger`
- common navigation helpers (`open`, `waitForLoad`)


Pages expose **intent-revealing methods** (`addProductToCart`,
`placeOrderAndGetId`) — never raw selectors — so tests stay declarative.


`PageManager` is a single entry point that constructs all page objects for a
given `Page` instance.


### Fixtures
`src/fixtures/test.fixture.js` extends Playwright's `test` with:
| Fixture          | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| `appConfig`      | Provides the loaded env config object                    |
| `pages`          | Provides a fresh `PageManager` per test                  |
| `loggedInPages`  | Auto-logs in using `appConfig.defaultUser`               |


Use them like:
```js
const { test, expect } = require('../src/fixtures/test.fixture');


test('user can ...', async ({ pages, appConfig }) => { ... });
test('user can ... (pre-authenticated)', async ({ loggedInPages }) => { ... });
```


### Environment configuration
`src/config/env.config.js` reads `env/.env.<ENV>` and exposes a typed object —
no scattered `process.env` access. Switch environments via the `ENV` variable
(`cross-env ENV=qa playwright test`).


### Test data
JSON test data lives under `src/data/` and is loaded through
`src/utils/dataLoader.js` to keep paths and parsing in one place.


### Logging
`src/utils/logger.js` is a tiny, dependency-free, leveled logger
(`LOG_LEVEL=debug|info|warn|error`) that writes structured lines to stdout/stderr.
Page objects use a scoped child logger so each line is tagged with the page.


### Reporting
The framework writes three report formats into `reports/`:
- `reports/html-report` — Playwright HTML report
- `reports/junit/results.xml` — CI-friendly JUnit XML
- `reports/allure-results` — input for `allure generate`


All three are also uploaded as artifacts in the GitHub Actions workflow.


### Tags
Tests are tagged with `@smoke`, `@regression`, `@orders`, etc. Run subsets via
`--grep`:
```bash
npx playwright test --grep @smoke
```


---


## Authoring a new test


1. Create or extend a page object under `src/pages/`.
2. Add it to `PageManager` if it's new.
3. Add JSON test data under `src/data/` if needed.
4. Create a spec under `tests/e2e/<feature>/` using the fixture:
  ```js
  const { test, expect } = require('../../../src/fixtures/test.fixture');


  test('@smoke @feature does X', async ({ pages }) => {
   await pages.loginPage.goto();
   // ...
  });
  ```


---


## CI


`.github/workflows/playwright.yml` runs:
1. `npm ci`
2. `npx playwright install --with-deps`
3. `npm run lint`
4. `npx playwright test`
5. Uploads HTML report, Allure results, and JUnit as artifacts.


Manual `workflow_dispatch` lets you choose the target environment and an
optional grep filter.


---


## Conventions


- Selectors live **only** inside page object constructors.
- Tests use the fixture-exported `test`/`expect`, not `@playwright/test` directly.
- Use `test.step()` to make Allure / HTML reports readable.
- Prefer `await expect(locator).toHaveText(...)` over manual assertions.
- Never put credentials in code — only in `env/.env.<env>` (and CI secrets).



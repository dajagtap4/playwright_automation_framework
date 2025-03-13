### YT LINK - 
https://www.youtube.com/watch?v=9_ClpUoVchg&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=37



### Allure Reports for playwright

### 1. Installation allure playwright module

run below all commands in vs code terminal
npm i -D @playwright/test allure-playwright


PS C:\Users\deepak.jagtap\Desktop\Projects\Playwright_Practice> npm i -D @playwright/test allure-playwright

added 6 packages, and audited 12 packages in 4s

found 0 vulnerabilities


in package .json below line will added -

"allure-playwright": "^3.0.7"


### 2. Installing allure command line 

npm install -g allure-commandline --save-dev 

or 

sudo npm install -g allure-commandline --save-dev

### 3. Playwright.config.js

add below line in reposrter
'allure-playwright',{outputFolder:'my-allure-results'


reporter: [['html'],
            ['allure-playwright',{outputFolder:'my-allure-results'}]
          ],

### 4. Run any test

npx playwright test -g "has title"  

in project structure 'allure-results' folder created 

### 5. generate allure report

allure generate my-allure-results -o allure-report --clean

above command generate allure report

### 6. Open allure report

allure open allure-report

Starting web server...
2024-12-21 11:08:35.540:INFO::main: Logging initialized @527ms to org.eclipse.jetty.util.log.StdErrLog

DONE---

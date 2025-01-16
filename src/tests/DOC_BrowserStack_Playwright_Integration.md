# BrowserStack Playwright Integration

> Run a sample build

## Clone sample repository

Clone our sample Git repository using the following commands:

```
git clone https://github.com/browserstack/node-js-playwright-browserstack.git

cd node-js-playwright-browserstack
```
## Set up the dependencies

Install the required dependencies by running the following command:

```
npm i
```

## Configure your browserstack.yml config file

The `browserstack.yml` file holds all the required capabilities to run your tests on BrowserStack

### 1. Set access credentials

> Set userName and accessKey properties in browserstack.yml to authenticate your tests on BrowserStack.

### 2. Specify platforms to test on
>Set the browsers/OS you want to test under the platforms object. Select over 100+ browsers-OS combinations from the list of [supported browsers and OS](https://www.browserstack.com/list-of-browsers-and-platforms-page/playwright)

### 3. Update the browserstack.yml config file

> Copy and replace the following config in the browserstack.yml file available in the root directory of the project. To run tests on Android devices, use the deviceName parameter as shown below:

`browserstack.yml`

```
userName: deepakjagtap_LFEIbt
accessKey: gtJ2cNqiRKbzRSALwMgp
platforms:
  - os: Windows
    osVersion: 11
    browserName: chrome
    browserVersion: latest
  - os: OS X
    osVersion: Ventura
    browserName: playwright-webkit
    browserVersion: latest
  - deviceName: Samsung Galaxy S23 Ultra
    browserName: chrome
    osVersion: 13.0
```

### Execute build on BrowserStack

You are now ready to run your build on BrowserStack. From the root directory of the project, run the following command.

```
npm run sample-test
```

### View test results

View your tests on the [BrowserStack Automate dashboard](https://automate.browserstack.com/dashboard/v2/builds/710b113e8b948817cb178409d1f33d6061354158/sessions/e3e5e4d9300c68e9ca294cd1a7ebfbfc19f62ebe). To learn more about the dashboard, check the [view test results](https://www.browserstack.com/docs/automate/playwright/view-test-results) document.

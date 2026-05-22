# Boomi Playwright - Beginner's Guide


---


## Imagine You Are Testing a Website Manually


You open a browser, go to `https://qa.boomi.com`, type email, type password, click login, and check if dashboard opens.


**You just did a manual test.**


Now imagine doing this 100 times every day for 50 different pages. That is tiring right?


---


## So We Write Code to Do It For Us


That code is called an **automated test**.


This project is a collection of such automated tests for the Boomi website.


---


## Now Let's Understand Each Part


---


### 1. `.env` file


**What it is:** A settings file


**Simple meaning:**


| Key | Meaning |
|---|---|
| `BASE_URL` | Which website to open |
| `USER_NAME` | Which email to use |
| `PASSWORD` | Which password to use |


> Just like before going to work you check — which office today? what floor?


---


### 2. `global_setup.ts`


**Simple meaning:**


Before tests start, this file runs and says:


> "Hey, load the settings file first!"


That's it. Just 5 lines. Just loads the `.env` file.


---


### 3. `playwright.config.ts`


**Simple meaning:** Rules for running tests


- Open **Chrome** browser
- Wait maximum **90 seconds** for things to load
- If test **fails** → save a video
- Run tests **one by one**
- Show results in a **HTML report**


---


### 4. `pom/` folder (Page Object Model)


**This is the most important concept for beginners.**


Think of it like this:


> You have a **notebook** for every page of the website.
> In that notebook you write:
> - Where is the login button?
> - Where is the email box?
> - How do I click sign in?


```
LoginPage.ts       = notebook for Login page
MarketplacePage.ts = notebook for Marketplace page
```


**Why?**
So in your test you just say:
```
loginPage.clickSignIn()
```
Instead of writing the complicated selector every time.


---


### 5. `fixtures/` folder


**Simple meaning:** Auto-setup before every test


Before every test runs, fixtures automatically:
- Open the browser
- Prepare all page notebooks (POM)
- Set up screenshot capture if test fails


> You don't have to do this manually in every test. It just happens automatically.


---


### 6. `tests/` folder


**Simple meaning:** The actual test steps


```
Step 1 → Go to login page
Step 2 → Type email
Step 3 → Type password
Step 4 → Click login
Step 5 → Check if dashboard opened ✅ or not ❌
```


- If all steps pass → **TEST PASSED** ✅
- If any step fails → **TEST FAILED** ❌ + video saved


---


## Full Picture


```
Settings (.env)
   ↓
Load settings (global_setup.ts)
   ↓
Set rules (playwright.config.ts)
   ↓
Prepare tools (fixtures)
   ↓
Run test steps (tests/)
   using page notebooks (pom/)
   ↓
See results (HTML Report)
```


---


## One Line Summary


> **Write steps once → Computer runs them automatically → Tells you pass or fail**




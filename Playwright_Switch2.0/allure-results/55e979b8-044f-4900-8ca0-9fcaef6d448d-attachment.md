# Test info

- Name: update resume on naukari for account secondary
- Location: c:\Users\Deepak\Desktop\projects\playwright_automation_framework\Playwright_Switch2.0\tests\naukari\naukari.spec.js:8:3

# Error details

```
Error: locator.setInputFiles: Error: strict mode violation: locator('input[type="file"]') resolved to 2 elements:
    1) <input type="file" id="attachCV" class="fileUpload waves-effect waves-light btn-large"/> aka getByRole('button', { name: 'Choose File' })
    2) <input title=" " type="file" id="fileUpload" accept="image/*" name="Fjb56fnotys359[UNyHNnYiMfVRWn]" class="fileUpload waves-effect waves-light btn-large"/> aka getByTitle(' ', { exact: true })

Call log:
  - waiting for locator('input[type="file"]')

    at c:\Users\Deepak\Desktop\projects\playwright_automation_framework\Playwright_Switch2.0\tests\naukari\naukari.spec.js:43:5
```

# Page snapshot

```yaml
- link "Naukri Logo":
  - /url: https://www.naukri.com
  - img "Naukri Logo"
- navigation:
  - list:
    - listitem:
      - link "Jobs 3":
        - /url: /mnjuser/recommendedjobs
      - list:
        - listitem:
          - link "Recommended jobs 75 New":
            - /url: /mnjuser/recommendedjobs
        - listitem:
          - link "NVites 39 New":
            - /url: /mnjuser/inbox
        - listitem:
          - link "Application status 20 Updates":
            - /url: /myapply/historypage
        - listitem:
          - link "Saved jobs":
            - /url: /mnjuser/savedjobs
    - listitem:
      - link "Companies":
        - /url: https://www.naukri.com/companies-hiring-in-india?src=gnbCompanies_homepage_srch
      - list:
        - listitem: Explore categories
        - listitem:
          - link "Unicorn":
            - /url: https://www.naukri.com/unicorn-companies-in-india-cat102?title=Unicorns%20actively%20hiring&src=gnbCompanies_homepage_srch
        - listitem:
          - link "MNC":
            - /url: https://www.naukri.com/mnc-companies-in-india-cat101?title=MNCs%20actively%20hiring&src=gnbCompanies_homepage_srch
        - listitem:
          - link "Startup":
            - /url: https://www.naukri.com/startup-companies-in-india-cat103?title=Startups%20actively%20hiring&src=gnbCompanies_homepage_srch
        - listitem:
          - link "Product based":
            - /url: https://www.naukri.com/product-companies-in-india-cat106?title=Product%20companies%20actively%20hiring&src=gnbCompanies_homepage_srch
        - listitem:
          - link "Internet":
            - /url: https://www.naukri.com/internet-companies-in-india-cat105?title=Internet%20companies%20actively%20hiring&src=gnbCompanies_homepage_srch
      - list:
        - listitem: Explore collections
        - listitem:
          - link "Top companies":
            - /url: https://www.naukri.com/companies-hiring-in-india?src=gnbCompanies_homepage_srch
        - listitem:
          - link "IT companies":
            - /url: https://www.naukri.com/it-companies-in-india-cat116?src=gnbCompanies_homepage_srch&title=IT%20Companies%20Hiring
        - listitem:
          - link "Fintech companies":
            - /url: https://www.naukri.com/fintech-and-payments-companies-in-india-cat108?title=Fintech%20%26%20Payments%20companies%20actively%20hiring&src=gnbCompanies_homepage_srch
        - listitem:
          - link "Sponsored companies":
            - /url: https://www.naukri.com/allcompanies?searchType=standardLogo&title=Sponsored+companies&branding=%257B%2522pagename%2522%253A%2522ni-desktop-standard-viewAll%2522%257D&pageNo=1&qcount=47&src=gnbCompanies_homepage_srch
        - listitem:
          - link "Featured companies":
            - /url: https://www.naukri.com/allcompanies?searchType=premiumLogo&title=Featured+companies+actively+hiring&branding=%257B%2522pagename%2522%253A%2522ni-desktop-premium-viewAll%2522%257D&pageNo=1&qcount=47&src=gnbCompanies_homepage_srch
      - list:
        - listitem:
          - text: Research companies by
          - img
          - text: Ambitionbox
        - listitem:
          - link "Interview questions":
            - /url: https://www.ambitionbox.com/interviews?utm_source=naukri&utm_medium=desktop&utm_campaign=gnb
        - listitem:
          - link "Company salaries":
            - /url: https://www.ambitionbox.com/salaries?utm_source=naukri&utm_medium=desktop&utm_campaign=gnb
        - listitem:
          - link "Company reviews":
            - /url: https://www.ambitionbox.com/reviews?utm_source=naukri&utm_medium=desktop&utm_campaign=gnb
        - listitem:
          - link "Salary Calculator":
            - /url: https://www.ambitionbox.com/salaries/take-home-salary-calculator?utm_campaign=gnb&utm_source=naukri&utm_medium=desktop
    - listitem:
      - link "Services 1":
        - /url: https://resume.naukri.com/?fftid=100001
      - list:
        - listitem: Resume writing
        - listitem:
          - link "Text resume":
            - /url: https://resume.naukri.com/resume-writing-services?fftid=101001
        - listitem:
          - link "Visual resume":
            - /url: https://resume.naukri.com/visual-resume-writing-services?fftid=101002
        - listitem:
          - link "Resume critique":
            - /url: https://resume.naukri.com/resume-critique?fftid=101006
        - listitem: Find Jobs
        - listitem:
          - link "Jobs4u":
            - /url: https://resume.naukri.com/job-alerts-on-mobile-mail?fftid=101011#jobmail
        - listitem:
          - link "Priority applicant":
            - /url: https://resume.naukri.com/priority-job-application?fftid=101019
        - listitem:
          - link "Contact us":
            - /url: https://resume.naukri.com/contact-us?fftid=101015
      - list:
        - listitem: Get recruiter's attention
        - listitem:
          - link "Resume display":
            - /url: https://resume.naukri.com/resume-display?fftid=101009
        - listitem: Interview Preparation
        - listitem:
          - link "AI Mock Interview":
            - /url: https://www.naukri.com/ai-interview-questions?fftid=NaukriGNBAIInterview
        - listitem: Monthly subscriptions
        - listitem:
          - link "Basic & premium plans":
            - /url: https://resume.naukri.com/subscription-product?fftid=101025
      - list:
        - listitem: Free resume resources
        - listitem:
          - link "Resume maker":
            - /url: https://www.naukri.com/resume-maker?utmTerm=ResumePro_Gnb&utmContent=gnbServices
        - listitem:
          - link "Resume quality score":
            - /url: https://resume.naukri.com/resume-quality-score?fftid=101003
        - listitem:
          - link "Resume samples":
            - /url: https://resume.naukri.com/resume-samples?fftid=101004
        - listitem:
          - link "Job letter samples":
            - /url: https://resume.naukri.com/job-letter-format
        - listitem: Promotional Offer
        - listitem:
          - link "FASTJOB20 20% off on services to help get more callbacks":
            - /url: https://resume.naukri.com/resume-display?fftid=notf_nauk_promo_rd
- textbox "Enter keyword / designation / companies"
- textbox "Select experience"
- text: 
- textbox "Enter location"
- text: Search jobs here
- button ""
- link "naukri360-pill naukri360-pill naukri360-pill naukri360-pill naukri360-pill naukri360-pill":
  - /url: /naukri360
  - img "naukri360-pill"
  - img "naukri360-pill"
  - img "naukri360-pill"
  - img "naukri360-pill"
  - img "naukri360-pill"
  - img "naukri360-pill"
- text:  27
- img "naukri user profile img"
- text: "2"
- img
- img
- text: 90% Deepak Jagtap
- emphasis: editOneTheme
- text: Profile last updated - Today
- emphasis: locationOt
- text: Pune, INDIA
- emphasis: experienceOneTheme
- text: 4 Years 3 Months
- emphasis: walletOneTheme
- text: ₹ 12,56,000
- emphasis: phoneOneTheme
- text: 8450975501 Verify
- emphasis: mailOneTheme
- text: deepakgithub4@gmail.com
- emphasis: verifiedOneTheme
- emphasis: calenderOneTheme
- text: Available to join in 15 Days or less
- emphasis: mobileVerifyOneTheme
- text: Verify mobile number ↑ 10%
- link "Add 1 missing details":
  - /url: javascript:void(0)
- list:
  - listitem: Quick links
  - listitem:
    - text: Resume
    - link "Update":
      - /url: javascript:;
  - listitem: Resume headline
  - listitem: Key skills
  - listitem:
    - text: Employment
    - link "Add":
      - /url: javascript:;
  - listitem:
    - text: Education
    - link "Add":
      - /url: javascript:;
  - listitem: IT skills
  - listitem: Projects
  - listitem: Profile summary
  - listitem: Accomplishments
  - listitem: Career profile
  - listitem: Personal details
- text: Diversity & inclusion Companies want to build inclusive teams, help us identify your disability status for better jobs.
- button "I have a disability"
- button "I don’t have a disability"
- button "Submit"
- img "icon"
- text: Naukri 360 Pro Power up your profile with AI-powered enhancements
- button "Get Naukri 360 Pro"
- text: Resume QA_DeepakJ_Resume.pdf Uploaded on Jul 25, 2025 downloadOneTheme deleteOneTheme
- button "Choose File"
- button "Update resume"
- list
- text: "Supported Formats: doc, docx, rtf, pdf, upto 2 MB Resume headline editOneTheme Immediate joiner- 4 Years and 3 Months of experience in automation testing In Selenium framework in java, playwright in Typescript, Postman API Key skills editOneTheme Selenium Automation Automation Karate Ui Automation MySQL Manual Testing Postman Playwright Automation Employment Add employment QA Engineer editOneTheme Cybage Full-time Apr 2021 to Nov 2024 (3 years 8 months) Selenium Automation QA Engineer (3.5+ years experience)- With experience in the media and marketing domains, I possess strong problem-solving abilities, adept at delivering optimal solutions. I excel as a team player, self-motivated, and a quick learner with effective communication s..."
- link "Read More":
  - /url: javascript:;
- text: Projects Amobee Activation Classy DEV Online Education Add education PG Diploma Computers editOneTheme Mumbai University 2020-2021Full Time B.El.Ed Elementary Education editOneTheme Not Mentioned 2017-2021Full Time Add doctorate/PhD Add class XII Add class X ;
- contentinfo:
  - link "Naukri Logo":
    - /url: https://www.naukri.com
    - img "Naukri Logo"
  - text: Connect with us
  - link "naukri social icons":
    - /url: https://www.facebook.com/Naukri
    - img "naukri social icons"
  - link "naukri social icons":
    - /url: https://instagram.com/naukridotcom/
    - img "naukri social icons"
  - link "naukri social icons":
    - /url: https://twitter.com/naukri
    - img "naukri social icons"
  - link "naukri social icons":
    - /url: http://www.linkedin.com/company/naukri.com
    - img "naukri social icons"
  - list:
    - listitem:
      - link "About us":
        - /url: http://infoedge.in
    - listitem:
      - link "Careers":
        - /url: https://careers.infoedge.com/
    - listitem:
      - link "Employer home":
        - /url: https://www.naukri.com/recruit/login
    - listitem:
      - link "Sitemap":
        - /url: https://www.naukri.com/sitemap/sitemap.php
    - listitem:
      - link "Credits":
        - /url: https://www.naukri.com/credits
  - list:
    - listitem:
      - link "Help center":
        - /url: https://www.naukri.com/faq/job-seeker?utm_source=footer
    - listitem:
      - link "Summons/Notices":
        - /url: https://w5.naukri.com/summons-notices-form/
    - listitem:
      - link "Grievances":
        - /url: https://w5.naukri.com/grievances-form/
    - listitem:
      - link "Report issue":
        - /url: https://w5.naukri.com/fdbck/main/feedback.php?app_id=15
  - list:
    - listitem:
      - link "Privacy policy":
        - /url: https://www.naukri.com/privacypolicy
    - listitem:
      - link "Terms & conditions":
        - /url: https://www.naukri.com/termsconditions
    - listitem:
      - link "Fraud alert":
        - /url: https://www.naukri.com/imposter/report-fake-job-recruiter
    - listitem:
      - link "Trust & safety":
        - /url: https://www.naukri.com/jobsearch/trust-safety
  - text: Apply on the go Get real-time job updates on our App
  - link "naukri app download":
    - /url: https://play.google.com/store/apps/details?id=naukriApp.appModules.login&hl=en&utm_source=naukri&utm_medium=footer
    - img "naukri app download"
  - link "naukri app download":
    - /url: https://itunes.apple.com/in/app/naukri.com-job-search/id482877505?mt=8
    - img "naukri app download"
  - link "naukri social logos":
    - /url: http://infoedge.in
    - img "naukri social logos"
  - text: All trademarks are the property of their respective owners All rights reserved © 2025 Info Edge (India) Ltd. Our businesses
  - list:
    - listitem:
      - link "nnacres":
        - /url: https://www.99acres.com/
        - img "nnacres"
    - listitem:
      - link "jeevansathi":
        - /url: https://www.jeevansathi.com/
        - img "jeevansathi"
    - listitem:
      - link "ng":
        - /url: https://www.naukrigulf.com/
        - img "ng"
    - listitem:
      - link "shiksha":
        - /url: https://www.shiksha.com/
        - img "shiksha"
    - listitem:
      - link "iimjobs":
        - /url: https://www.iimjobs.com
        - img "iimjobs"
    - listitem:
      - link "hirist":
        - /url: https://www.hirist.tech/
        - img "hirist"
    - listitem:
      - link "jobhai":
        - /url: https://www.jobhai.com
        - img "jobhai"
    - listitem:
      - link "doselect":
        - /url: https://doselect.com/
        - img "doselect"
    - listitem:
      - link "minis":
        - /url: https://www.naukri.com/minis
        - img "minis"
    - listitem:
      - link "codingninjas":
        - /url: https://www.codingninjas.com/?utm_source=naukri&utm_medium=desktop-footer
        - img "codingninjas"
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const credSet = JSON.parse(JSON.stringify(require("./creds.json")));
   3 | const path = require('path');
   4 |
   5 |
   6 | for(const cred of credSet)
   7 | {
   8 |   test(`update resume on naukari for account ${cred.accName}`, async ({ page }) => 
   9 |   {
  10 |
  11 |     await page.goto("https://www.naukri.com/");
  12 |     await page.waitForLoadState('networkidle');
  13 |
  14 |     //login
  15 |     await page.locator("#login_Layer").click();
  16 |     await page.waitForLoadState('networkidle');
  17 |
  18 |     await page.locator("[name=login-form]>div:nth-child(2)>input").fill(cred.username);
  19 |     await page.locator("[name=login-form]>div:nth-child(3)>input").fill(cred.password);
  20 |     await page.locator(".btn-primary.loginButton").click();
  21 |     await page.waitForLoadState('networkidle');
  22 |     
  23 |     // verify login with url
  24 |     await page.waitForURL('https://www.naukri.com/mnjuser/homepage', { timeout: 10000 });
  25 |     expect(page.url()).toContain("https://www.naukri.com/mnjuser/homepage");
  26 |
  27 |     // navigate to profile
  28 |     await page.locator("img[alt='naukri user profile img']").click();
  29 |     //await page.waitForLoadState('networkidle');
  30 |
  31 |     await page.locator('text=View & Update Profile').click();
  32 |     //await page.waitForLoadState('networkidle');
  33 |
  34 |     //set file path for resume
  35 |     const filePath = path.resolve('tests/naukari/resume/QA_DeepakJ_Resume.pdf');
  36 |
  37 |     await page.click('input[value="Update resume"]');
  38 |
  39 |     // update resume
  40 |     //await page.locator('.dummyUpload.typ-14Bold').setInputFiles('tests/naukari/resume/QA_DeepakJ_Resume.pdf')
  41 |     
  42 |     const fileInput = page.locator('input[type="file"]');
> 43 |     await fileInput.setInputFiles(filePath);
     |     ^ Error: locator.setInputFiles: Error: strict mode violation: locator('input[type="file"]') resolved to 2 elements:
  44 |
  45 |     //verify resume uploaded.
  46 |     const message = page.locator('text=Resume has been successfully uploaded.');
  47 |     await expect(message).toBeVisible();
  48 |
  49 |     // navigate to profile
  50 |     await page.locator("img[alt='naukri user profile img']").click();
  51 |     //await page.waitForLoadState('networkidle');
  52 |
  53 |     await expect(page.getByText('Logout')).toBeVisible();
  54 |     // logout
  55 |     await page.locator('text=Logout').click();
  56 |     // await page.waitForLoadState('networkidle');
  57 |     // verify logout with url
  58 |     expect(page.url()).toContain("https://www.naukri.com/");
  59 |
  60 |   });
  61 |
  62 | }
```
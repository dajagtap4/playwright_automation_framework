 const {test, expect} = require('@playwright/test');

 //test.use({ browserName: 'webkit'});
//  test('@Web Browser Context-Validating Error login', async ({browser})=>
//  {
   
//       const context = await browser.newContext();
//       const page =  await context.newPage();
//     // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
//       const userName = page.locator('#username');
//       const signIn = page.locator("#signInBtn");
//       const cardTitles =  page.locator(".card-body a");
//       page.on('request',request=> console.log(request.url()));
//       page.on('response',response=> console.log(response.url(), response.status()));
//       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//       console.log(await page.title());
//       //css 
//      await userName.fill("rahulshetty");
//      await page.locator("[type='password']").fill("learning");
//      await signIn.click();
//     console.log(await page.locator("[style*='block']").textContent());
//     await expect(page.locator("[style*='block']")).toContainText('Incorrect');
//     //type - fill
//     await userName.fill("");
//     await userName.fill("rahulshettyacademy");
//     await signIn.click();
//     console.log(await cardTitles.first().textContent());
//    console.log(await cardTitles.nth(1).textContent());
//    const allTitles = await cardTitles.allTextContents();
   
//    console.log(allTitles);

//  });
 

 test('@Web UI Controls', async ({page})=>
 {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Choosing option inside dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");

    // Check radio button and accept popup alert
    await page.locator("#usertype").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked()); // true or false
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    //Checkbox
    await page.locator("#terms").click();
    await expect( page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect( await page.locator("#terms").isChecked()).toBeFalsy();


    //Blinking link 
    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
 });

 

 test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   

   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);

    await page.locator("#username").fill(domain);
  //  await page.pause();
  console.log("this is on page 1 =", await page.locator("#username").inputValue());

 })
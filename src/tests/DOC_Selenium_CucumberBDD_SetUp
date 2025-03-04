# Selenium with BDD setup

1. Create Maven project,
2. Add maven dependancies 

```
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.21.1</version>
</dependency>
```

3. Create `Features` folder at 
`src/test/resources` craete `login.feature` file in Features folder.

`login.feature` 
```
Feature: Add Feature here 

Scenario: Add Scenario here 

Given user is on login page
When user enter username and password
And click on login button
Then user is navigated to homepage

```

4. Right clickj on above feature file > Run As > Cucumber feature, Step Definisions will create in console 

5. Create `Step Definitions` folder at `src/test/java`, create java class `loginSteps.java`, paste all from console


```
package StepDefinations;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class loginSteps {
	@Given("user is on login page")
	public void user_is_on_login_page() {
		System.out.println("user is on login page1");
	}

	@When("user enter username and password")
	public void user_enter_username_and_password() {
		System.out.println("user enter username and password2");
	}

	@When("click on login button")
	public void click_on_login_button() {
		System.out.println("click on login butto3");
	}

	@Then("user is navigated to homepage")
	public void user_is_navigated_to_homepage() {
		System.out.println("user is navigated to homepage4");
	}

}
```

5. Run again (Right click on feature file > Run As > Cucumber feature)

we will se below result 

```
Scenario: check user test 1             # src/test/resources/Features/login.feature:3
user is on login page1
  Given user is on login page           # StepDefinations.loginSteps.user_is_on_login_page()
user enter username and password2
  When user enter username and password # StepDefinations.loginSteps.user_enter_username_and_password()
click on login butto3
  And click on login button             # StepDefinations.loginSteps.click_on_login_button()
user is navigated to homepage4
  Then user is navigated to homepage    # StepDefinations.loginSteps.user_is_navigated_to_homepage()

1 Scenarios (1 passed)
4 Steps (4 passed)
0m0.134s
```

#  BASIC SETUP DONE ^

There are advanced concepts in cucumber bdd will add later.

## JSON Schema Validation

Refer This Link - 
```
https://www.youtube.com/watch?v=rkGI32WXmPQ&list=PLhW3qG5bs-L8xPrBwDv66cTMlFNeUPdJx&index=10
```
Search "json to json schema converter" and click below link 
```
https://www.liquid-technologies.com/online-json-to-schema-converter
```
Add JSON data as below
```
https://reqres.in/api/users?page=2
```
(copy all JSON data from above link and paste in JSOn Schema Validator)

Now Navigate to peoject explorer and go to "target " folder path which is 

Example -
```
C:\Users\deepak.jagtap\eclipse-workspace\RESTassured_Automation\targets
```
in above path there should be two folders 

`classes` , `test-classes`

in classes folder create schema.json file and paste that schema we generated.

```
package test;

import static io.restassured.RestAssured.baseURI;
import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import org.testng.annotations.Test;

public class JSONSchemaValidator {

	@Test
	public void getTest() {
		
		baseURI = "https://reqres.in/api";

		given().get("/users?page=2").then()
		.assertThat().body(matchesJsonSchemaInClasspath("schema.json"))
		.statusCode(200);
	}
}

```

>DONE **JSON Schema Valitation**



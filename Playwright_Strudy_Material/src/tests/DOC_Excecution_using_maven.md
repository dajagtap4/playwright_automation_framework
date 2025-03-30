
# Test Excecution using maven commands

Create `testng.xml` file in your selenium project 

Steps - 

1. Right click on project,
2. Testng,
3. Convert to testng,
4. Finish,

testng.xml file will create in your selenium project.

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">

<suite name="Suite">
  <test thread-count="5" name="Test">

    <classes>
      <class name="org.deepakjagtap.TestCase"/>
    </classes>

  </test> <!-- Test -->
</suite> <!-- Suite -->

```

here we want to execute test from `TestCase` class only so we added it into testng file with proper path like `org.deepakjagtap.TestCase`.

add below code in pom.xml file for maven ,

`pom.xml`
```

<profiles>
	<profile>
		<id>smoke</id>
		<build>
			<pluginManagement>
				<plugins>
					<plugin>
						<groupId>org.apache.maven.plugins</groupId>
						<artifactId>maven-surefire-plugin</artifactId>
						<version>3.5.2</version>
						<configuration>
							<suiteXmlFiles>
								<suiteXmlFile>testng.xml</suiteXmlFile>
							</suiteXmlFiles>
						</configuration>
					</plugin>
				</plugins>
			</pluginManagement>
		</build>
	</profile>
</profiles>
```

here, we added `testng.xml` as `<suiteXmlFile>testng.xml</suiteXmlFile>` and given `<id>smoke</id>` so it will execute only testng.xml file and in testng.xml file we given 
` <class name="org.deepakjagtap.TestCase"/>` this class so only test of that class will excecute.

**_(there can be couple of testng.xml files like testng2.xml, testng_regression.xml)_**

5. open cmd terminal,
6. navigate to this project path,
 * right click on project,
 * properties,
 * copy full path,
 ```
 C:\Users\deepak.jagtap\eclipse-workspace\Appium_Android_Framework_POM
 ```
 * in cmd navigate to that project path as below
 ```
 cd C:\Users\deepak.jagtap\eclipse-workspace\Appium_Android_Framework_POM
 ```

 7. hit below command 
 ` npm test -Psmoke`

 note we given `<id>smoke</id>` in pom.xml.

 Done with maven 

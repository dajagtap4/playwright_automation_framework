
---
# Jenkins Setup

Click below link for Jenkins installation-
https://www.jenkins.io/download/

1. CLick on Windows optiom
2. Download will start 
3. Double click on jenkins.msi file which is downloaded,
* Next > Next > Run service as local system > Test Port > Next > Next > Next > Install.

4. Navigate to jenkins Localhost - http://localhost:8080/

5. Need to find key to unlock, 
* Navigate to below path,
```
C:\ProgramData\Jenkins\.jenkins\secrets\initialAdminPassword
```
6. Select "Install Suggested plugins"
* Getting Started.

## Execution  on jenkins 

New Item > enter item name > freestyle project >ok

add `description` like 
```
"CI/CD pipeline for building and testing the Android application."
```
click on `advanced `
below the `"Execute concurrent builds if necessary"`


click on 
`"Use custom workspace"`
add project path in `Directory` `"C:\Users\deepak.jagtap\eclipse-workspace\Appium_Android_Framework_POM"`

add command in `Build Steps` without mvn
```
test -Psmoke
```
save

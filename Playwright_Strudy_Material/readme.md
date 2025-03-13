# Playwright Framework Setup
To set up Playwright, you need to meet a few prerequisites. Here’s a list of the necessary requirements for installation:
### Pre Requisites  - 
1. Java 
2. Vs Code 
3. node js

---

> ### 1. Install java 

To Install java [Click Here](https://www.oracle.com/in/java/technologies/downloads/#jdk22-windows)


```
select windows as OS 

click link behind x64 Installer

open downloaded file > double click on it > Next > Close
```
`Now we have to set path in env variable.`
```
select path from file location upto bin as below
C:\Program Files\Java\jdk-22\bin

Goto env variable > system variable > path > add path.
```
`Check java is installed or not`
```
Open cmd > java --version 
         > javac --version
```
---
>### 2. Vs Code 

[Click here](https://code.visualstudio.com/download) for vs code installation

---
>### 3. node js

[click here](https://nodejs.org/en/download) for node js installation

Playwright requires Node.js version 12 or above.
To check your Node.js version
```
node -v
npm -v
```

---

We have installed all Pre Requisites, we can start with playwright framework, 


1. Create folder `Playwright Framework` at any place lets say desktop,

2. Open Vs code, 

    - File > Open folder > select `Playwright Framework`

    - click `extensions` (side vertical bar) >  
    install `Playwright Test for VSCode`,

    - Terminal > New Terminal > Hit below first command to create project
    ```
   npm init playwright@latest
   ```
---


> Done with playwright setup run your first test.

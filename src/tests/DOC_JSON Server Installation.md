## JSON-Server Installation
>#### Pre Requisite -  ***node.js***

Refer [this video](https://www.youtube.com/watch?v=V7sLq7u28BA&list=PLhW3qG5bs-L8xPrBwDv66cTMlFNeUPdJx&index=8) for json-server installation and creat local API
Create file ___`"db.json"`___ at any place, i have created it at `C:\Users\deepak.jagtap>`

Paste below data into  ___`"db.json"`___
```
{
  "users": [
    {
      "firstname": "anmol",
      "location": "pune",
      "lastname": "naik",
      "id": "8c7e"
    },
    {
      "id": "7b67",
      "firstname": "johny",
      "location": "NYC",
      "lastname": "paul"
    },
    {
      "id": "6c6e",
      "firstname": "akshay",
      "location": "Mumbai",
      "lastname": "kumar"
    }
  ],
  "subjects": [
    {
      "name": "automation",
      "id": "1"
    },
    {
      "name": "QA",
      "id": "2"
    }
  ]
}
```
---
Open cmd from same location, Hit below command,
```
npm install -g json-server
```
```
Output :
changed 45 packages in 5s

14 packages are looking for funding
  run `npm fund` for details
```
---
Check json server installed succesfully in system with below command,
```
json-server --version
```
```
Output:
1.0.0-beta.3
```
hit below command to read data from ___`"db.json"`___

```
json-server --watch db.json
```

```
Output:

--watch/-w can be omitted, JSON Server 1+ watches for file changes by default
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

♡( ◡‿◡ )

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/users
http://localhost:3000/subjects
```

We are done with json-server installation, now hover over on endpoints listed and ctr+click or open "http://localhost:3000/" on any browser and see results

> DONE

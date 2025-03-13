## API Testing Playwright setup

#### Create `backend/tests/api.spec.ts` in project

`api.spec.ts`

```
import {expect, test} from '@playwright/test'

var userid;

test.describe('REST API Tests with ReqRes', () => {

test('apiGet',async ({request}) => {
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)
});

test('apiPost',async ({request}) => {
    const response = await request.post('https://reqres.in/api/users',

                                         {
                                            data:{"name":"Deepak","job":"QA" },
                                            headers:{"Accept":"application/json "}
                                        });
    console.log(await response.json())
    expect(response.status()).toBe(201)   
    
    var ser = await response.json();
    userid=ser.id
})

test('apiPut',async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/'+userid,

        {
            data:{"name":"Deepak","job":"Billionaire" },
            headers:{"Accept":"application/json "}
        });

    console.log(await response.json())
    expect(response.status()).toBe(200)   

})

    test('apiDelete',async ({request}) => {
     await request.delete('https://reqres.in/api/users/'+userid)

    })

});
```

### make below chnages in `playwright.config.js` file

```
module.exports = defineConfig({
  testDir: '.',
```

Run api test with below command 

Below command will ***excecute all tests*** within `api.spec.ts` file

```
npx playwright test ./backend/tests/api.spec.ts
``` 

Excecute specific test within file

```
 npx playwright test -g "apiGet"
```

Excecute all tests within project( `api`,`UI` )

```
npx playwright tests
```
---

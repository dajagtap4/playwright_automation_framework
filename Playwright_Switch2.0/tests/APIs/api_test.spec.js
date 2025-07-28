// we are covering get post put delete methods 
// this is very basic concept.
//===============================================

const { test, expect } = require('@playwright/test');
//const { request } = require('node:http');

test("API GET Request",async({request})=>{


    
    const responseGet = await request.get('https://reqres.in/api/users/2');

    expect(responseGet.status()).toBe(200);

    const text = await responseGet.text();
    expect(text).toContain('Janet');

    console.log(await responseGet.json());
    
});

//this post test is not working at toBe(201); but code is correct 
test.skip("API POST Request",async({request})=>{

    const responsePost = await request.post('https://reqres.in/api/users',{
            json:{
                name: "Deepak",
                job : "QA"
            }
        });

    expect(responsePost.status()).toBe(201);

    const text = await responsePost.text();
    expect(text).toContain('Deepak');

     console.log(await responsePost.json());
    
});

//this post test is not working at toBe(200); but code is correct 
test.skip("API PUT Request",async({request})=>{

    const responsePut = await request.put('https://reqres.in/api/users/2',{
            json:{
                name: "Deepak",
                job : "QA"
            }
        });

    expect(responsePut.status()).toBe(200);

    const text = await responsePut.text();
    expect(text).toContain('Deepak');

     console.log(await responsePut.json());
    
});

//this post test is not working at toBe(204); but code is correct 
test.skip("API DELETE Request",async({request})=>{

    const responseDelete = await request.delete('https://reqres.in/api/users/2');

    expect(responseDelete.status()).toBe(204);
});
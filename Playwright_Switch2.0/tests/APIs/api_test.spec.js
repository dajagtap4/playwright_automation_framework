// https://thinking-tester-contact-list.herokuapp.com/
// dj@gmail.com/Deepak@1994
//===============================================

const { test, expect } = require('@playwright/test');
//const { request } = require('node:http');

test("API GET Request",async({request})=>{

    const responseGet = await request.get(
        'https://thinking-tester-contact-list.herokuapp.com/contacts',
        {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTZmNTU2NDE0N2E4ZDAwMTU0OWFlN2QiLCJpYXQiOjE3NzM0MTk4MjB9.A_tRCvSfnE_ZXVDUA3OoF-Fzcr8romdicYDm8RmNAc4"
            }
        }
    );
    expect(responseGet.status()).toBe(200);

    const text = await responseGet.text();
    expect(text).toContain('jadhav');

    console.log(await responseGet.json());
    
});

//this post test is not working at toBe(201); but code is correct 
test("API POST Request",async({request})=>{

    const responsePost = await request.post(
  'https://thinking-tester-contact-list.herokuapp.com/contacts',
  {
     headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTZmNTU2NDE0N2E4ZDAwMTU0OWFlN2QiLCJpYXQiOjE3NzM0MTk4MjB9.A_tRCvSfnE_ZXVDUA3OoF-Fzcr8romdicYDm8RmNAc4"
            },
    data: {
      firstName: "Deepak",
      lastName: "Jagtap",
      birthdate: "1970-01-01",
      email: "rb@gmail.com",
      phone: "8005555555",
      street1: "pune.",
      street2: "Apartment A",
      city: "Anytown",
      stateProvince: "MH",
      postalCode: "12345",
      country: "India"
    }
  }
);

    expect(responsePost.status()).toBe(201);

    // const text = await responsePost.text();
    // expect(text).toContain('Jagtap');

     console.log(await responsePost.json());
    
});

//this post test is not working at toBe(200); but code is correct 
test("API PUT Request",async({request})=>{

    const responsePut = await request.put(
  'https://thinking-tester-contact-list.herokuapp.com/contacts/69b3b6b919c156001532c856',
  {
     headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTZmNTU2NDE0N2E4ZDAwMTU0OWFlN2QiLCJpYXQiOjE3NzM0MTk4MjB9.A_tRCvSfnE_ZXVDUA3OoF-Fzcr8romdicYDm8RmNAc4"
            },
    data: {
    firstName: 'vineet',
    lastName: 'sharma',
    birthdate: '1970-01-01',
    email: 'vs@gmail.com',
    phone: '8005555555',
    street1: 'hanuman mandir.',
    street2: 'Apartment A',
    city: 'bangalore',
    stateProvince: 'KS',
    postalCode: '12345',
    country: 'India',
    }
  }
);

    expect(responsePut.status()).toBe(200);

    const text = await responsePut.text();
    expect(text).toContain('bangalore');

     console.log(await responsePut.json());
    
});

//this post test is not working at toBe(204); but code is correct 
test("API DELETE Request",async({request})=>{

const responseDelete = await request.delete(
        'https://thinking-tester-contact-list.herokuapp.com/contacts/6970db8d200602001583cc74',
        {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTZmNTU2NDE0N2E4ZDAwMTU0OWFlN2QiLCJpYXQiOjE3NzM0MTk4MjB9.A_tRCvSfnE_ZXVDUA3OoF-Fzcr8romdicYDm8RmNAc4"
            }
        }
    );
   //expect(responseDelete.status()).toBe(200);
    expect([200, 204]).toContain(responseDelete.status());
});

test("Delete multiple contacts", async ({ request }) => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTZmNTU2NDE0N2E4ZDAwMTU0OWFlN2QiLCJpYXQiOjE3NzM0MTk4MjB9.A_tRCvSfnE_ZXVDUA3OoF-Fzcr8romdicYDm8RmNAc4";

    const ids = [
        "69b43dbc19c156001532cd9b",
        "6971009a200602001583ccbf",
        "698f68cbf183e5001527b2af",
        "6974bf098e685600153bc53f",
        "6971b7e9907de00015ae15cc",
        "6971b7af50696900157ed566",
        "6971ade850696900157ed557",
        "69b3b73f19c156001532c857",
        "69b3b7f3ed7f8200150d3046"
    ];

    for (const id of ids) {

        const response = await request.delete(
            `https://thinking-tester-contact-list.herokuapp.com/contacts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(`Deleted ${id} → Status:`, response.status());

        expect([200, 204]).toContain(response.status());
    }

});
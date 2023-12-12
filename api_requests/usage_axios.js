// import axios from "axios";
const axios = require('axios')
const {expect} = require('chai')


//npx mocha api_requests/usage_axios.js --timeout=30000

            
describe('Actions for dummyjson website', async() => {
    let baseUrl = `https://dummyjson.com`; 
    let userId;
    let userName;
    let userPwd;
    let userToken;

    it.skip('Create User', async() => {
        const createUserData = await axios.post(`${baseUrl}/users/add`, 
        {
            'firstName': 'Muhammad',
            'lastName': 'Ovi',
            'age': 250,
        },
        {
            headers: {
                'Content-Type': 'aaplication/json'
            }
        })
        console.log(createUserData.data)
        userId = createUserData.data.id
    })

    it('Get Created User', async() =>{
        const getUserData = await axios.get(`${baseUrl}/users/1`)
        console.log(getUserData.data)
        userName = getUserData.data.username
        userPwd = getUserData.data.password
    })

    it ('Getting Cridentials', async() => {
        const getTokenData = await axios.post(`${baseUrl}/auth/login`,
        {
            'username': userName,
            'password': userPwd,
            expiresInMins: 30
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(getTokenData.data)
        userToken = getTokenData.data.token

    })

//     fetch('https://dummyjson.com/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'BMW Pencil',
//     /* other product data */
//   })
// })
// .then(res => res.json())
// .then(console.log);

    it('Create Product', async() =>{
        const createProduct = await axios.post(`${baseUrl}/products/add`,
        {
            'title': 'BMW3 Pencil',
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            } 
        })
        console.log(createProduct.data)
        expect(createProduct.status).equal(200)

    })

            
    it.skip('Update Created User', async() =>{
        const updateUserData = await axios.put(`${baseUrl}/users/101`, 
        {
            lastName: 'kminchelle'
        },
        {
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(updateUserData.data)
        console.log(updateUserData.statusText)
        })
})
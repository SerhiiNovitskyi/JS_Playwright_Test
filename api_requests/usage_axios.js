// import axios from "axios";
const axios = require('axios')
const {expect} = require('chai')
const data = require('./data/dummy_data.json')
const fs = require('fs-extra');


//npx mocha api_requests/usage_axios.js --timeout=30000

            
describe('Actions for dummyjson website', async() => {
    let userId;
    let userName;
    let userPwd;
    let userToken;

    it.skip('Create User', async() => {
        const createUserData = await axios.post(`${data.baseUrl}/users/add`, 
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

    it('Create Product', async() =>{
        const createProduct = await axios.post(`${data.baseUrl}/products/add`,
        {
            'title': 'BMW3 Pencil',
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`,
            } 
        })
        console.log(createProduct.data)
        expect(createProduct.status).equal(200)

    })

            
    it.skip('Update Created User', async() =>{
        const updateUserData = await axios.put(`${data.baseUrl}/users/101`, 
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
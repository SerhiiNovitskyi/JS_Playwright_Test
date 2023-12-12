// import axios from "axios";
const axios = require('axios')
const {expect} = require('chai')
const data = require('./data/dummy_data.json')
const fs = require('fs-extra');
const { URLSearchParams } = require('url');


//npx mocha api_requests/usage_axios.js --timeout=30000

            
describe('Actions for users on dummyjson website', async() => {
    let userId;
    let userName;
    let userLastName;
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

    it.skip('Create Product', async() =>{
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

    it('get user by search params', async() =>{
        // const params = new URLSearchParams ([['key', 'hair.color'], ['value','Brown']])
        const params = { key: 'hair.color', value: 'Brown'}
        const getUserByParams = await axios.get(`${data.baseUrl}/users/filter`, { params })
        expect(getUserByParams.status).equal(200)
        // Additional assertions on response data
        expect(getUserByParams.data).to.have.property('users').that.is.an('array');
        expect(getUserByParams.data.users[2]).to.have.property('id');
        expect(getUserByParams.data.users[2]).to.have.property('firstName');
        expect(getUserByParams.data.users[2]).to.have.property('lastName');

        // console.log(getUserByParams.data)
        userName = getUserByParams.data.users[2].firstName
        userId = getUserByParams.data.users[2].id
        userLastName = getUserByParams.data.users[2].lastName
        // console.log(userName) //Arely
        // console.log(userId)  //18

    })

    it('get user by Id and compare value', async() =>{
        const getUser = await axios.get(`${data.baseUrl}/users/${userId}`) 
        // console.log(getUser.data)
        expect(userName).equal(getUser.data.firstName)
        expect(userLastName).equal(getUser.data.lastName)
    })
            
    it.skip('Update Created User', async(userId) =>{
        const updateUserData = await axios.put(`${data.baseUrl}/users/${userId}`, 
        {
            firstName: 'Marko',
            lastName: 'Polo'
        },
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
                    },
        })
        console.log(updateUserData.data)
        console.log(updateUserData.statusText)
        console.log(updateUserData.status)
        })
       
        it.skip('Update Created User', async(userId,userName,userLastName) =>{  



        })  
})
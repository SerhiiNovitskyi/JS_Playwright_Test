const axios = require('axios')
const {expect} = require('chai')
const data = require('./data/dummy_data.json')
const fs = require('fs-extra');


describe('login and getting token', async() => {
    it('Get Created User', async() =>{
        const getUserData = await axios.get(`${data.baseUrl}/users/1`)
        console.log(getUserData.data)
        userName = getUserData.data.username
        userPwd = getUserData.data.password
        expect(getUserData.status).equal(200)
    })

    it ('Getting Cridentials', async() => {
        const getTokenData = await axios.post(`${data.baseUrl}/auth/login`,
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
        // console.log(getTokenData.data)
        userToken = getTokenData.data.token
        data.token = userToken
        fs.writeFileSync('api_requests/data/dummy_data.json', JSON.stringify(data))
    })
})
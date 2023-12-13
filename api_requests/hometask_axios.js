const axios = require('axios');
const {expect} = require('chai')

// Base URL for JSONPlaceholder
describe('Actions for dummyjson website', async() => {

let baseURL = 'https://jsonplaceholder.typicode.com';

// GET request
it('Get Created Post', async() =>{
        const response = await axios.get(`${baseURL}/posts/1`);
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('title');
        console.log('GET Response:', response.data);
        
    })


// POST request
it('Get Created Post', async() =>{
    const newPost = {
        title: 'New Post',
        body: 'This is a new post.',
        userId: 1,
    };
    const response = await axios.post(`${baseURL}/posts`, newPost);
        expect(response.status).to.equal(201);
        console.log('POST Response:', response.data);
    }); 


// PUT request
it('update Created Postr', async () => {
    const updatedPost = {
        title: 'Updated Post',
        body: 'This post has been updated.',
        userId: 1,
    };

    const response = await axios.put(`${baseURL}/posts/1`, updatedPost);
    expect(response.status).to.equal(200);
    console.log('PUT Response:', response.data);
});
});

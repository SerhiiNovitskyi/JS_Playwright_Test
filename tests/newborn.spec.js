import { test, expect, request } from '@playwright/test';
import { MainPageNewborn } from './pages/mainPageNewBorn'
// import { ApiHelper } from '../helpers/apiHelper'

test.describe('Verification steps for newborn website', () => {
    const USER = {
        email: "email@dmytro.com",
        pwd: 'abc123',
        token: ''
    }
    test.beforeAll(async({request}) => {
        const response = await request.post(
            'api/auth/login/', {
                data: {
                    email: USER.email,
                    password: USER.pwd
                },
                headers: {
                    "Content-Type": "application/json",
               },
            })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        expect(body).toHaveProperty('token')
        USER.token = body.token
        console.log('AUTH', USER.token)
        // USER.token = await ApiHelper.getToken(USER.email, USER.pwd)    
        // USER.token = await ApiHelper.g(USER.email, USER.pwd)

    })


    // test.beforeAll(async() =>{
    //     // let token = await ApiHelper.getToken({
    //     //     email: 'email@dmytro.com',
    //     //     password: 'abc123'
    //     // })
    // const requestContext = await request.newContext({
    //     httpCredentials: {
    //         email: 'email@dmytro.com',
    //         password: 'abc123'
    //     }
    // })  
    // await requestContext.post('/api/auth/login')
    // await requestContext.storageState('12.json')
    // })

    test.beforeEach(async({page}) => {
        page.addInitScript((value) => {
            window.localStorage.setItem('auth-token', value)
        }, USER.token)
        await page.goto('/overview')
    })



    // test.beforeEach(async({ page }) => {
    //     await page.goto('/login')
    //     await page.getByLabel('Email:').fill('email@dmytro.com')
    //     await page.getByLabel('Пароль:').fill('abc123')
    //     await page.locator("button[type='submit']").click()
    //     await expect(page.locator('body > app-root > app-site-layout > ul > li.bold.last > a')).toBeVisible()
    //     await page.goto('/overview')
    // })

    test('check the stage after open page', async ({ page }) =>{
        // await page.goto ('http://5.189.186.217/')
        await expect(page.locator('spam.card-title').nth(0)).toBeVisible()
        await expect(page.locator('div.row span.card-title').nth(0)).toHaveText('Виручка:')
    })

    test.skip('usage POM', async({ page }) =>{
        const mainpagenewborn = new MainPageNewborn(page)
        mainpagenewborn.verifyLogoutVisible()
    })

    test('without POM', async ({ page }) => {
        await expect(page.locator('ul > li.bold.last > a')).toHaveText('Вийти')
    })

})

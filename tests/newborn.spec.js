const { test, expect } = require('@playwright/test');
const { MainPageNewborn } =('./pages/mainPageNewBorn');

test.describe('Verification steps for newborn website', () => {
    
    test.beforeEach(async({ page }) => {
        await page.goto('/')
    })

    test('check the stage after open page', async ({ page }) =>{
        // await page.goto ('http://5.189.186.217/')
        await expect(page.locator('spam.card-title').nth(0)).toBeVisible()
    })

    test('usage POM', async({ page }) =>{
        const mainpagenewborn = new MainPageNewborn(page)
        mainpagenewborn.verifyLogoutVisible()
    })

})

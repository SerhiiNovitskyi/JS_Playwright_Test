const { test, expect } = require('@playwright/test');

test('check the stage after open page', async ({ page}) =>{
    await page.goto ('http://5.189.186.217/')
    await expect(page.locator('spam.card-title').nth(0)).toBeVisible()
})

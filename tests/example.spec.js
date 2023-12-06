// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('my test for de lang in London timezone', async ({ page, context }) => {
  await context.grantPermissions(['notifications','geolocation'], { origin: 'https://www.bing.com/maps' });

  await page.goto('https://www.bing.com/maps');
  await context.setGeolocation({ longitude: 51.303551, latitude: 0.751312 });

  await expect(page.getByLabel('Search', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Search', { exact: true })).toBeEmpty();
  await page.getByLabel('Search', { exact: true }).click();
  await page.screenshot({path: 'screenshots/check-search-location.png' });
  await page.keyboard.type('clothing store');
  await page.keyboard.press('Enter');
  await page.waitForSelector('h3');
  expect(page.url()).toContain('search');
  const firstResultUrl = await page.getAttribute('h3 a', 'href');
  expect(firstResultUrl).toBeTruthy();

});

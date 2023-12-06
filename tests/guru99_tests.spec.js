const { test, expect } = require('@playwright/test');

test.use({
  headless: true,
});

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.guru99.com/');
        // Go to the starting url before each test.
    })

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
})

test.describe.configure({ mode: "serial"})
test.describe('Open Guru99 Main Page', () => {
    test.describe.configure({ timeout: 60000 })
    test ('open the main page', async({ page }) => {

      await expect(page.getByRole('h1', {name: 'Tutorials Library'})).toBe
    })

    test('test redirecting into Child Pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Guru99' })).toBeVisible()
    await expect(page.locator('h1')).toContainText('Tutorials Library')
    await page.getByRole('link', { name: '➤ SAP Beginner' }).click();
    await expect(page.locator('h1')).toContainText('Tutorial for Beginners')
    await expect(page.locator('#post-478')).toContainText('SAP Business Suite')

})

test('test Search Field', async ({ page }) => {
    await page.goto('https://www.guru99.com/');
    await expect(page.getByRole('link', { name: 'Guru99' })).toBeVisible();
    await expect(page.locator('h1')).toContainText('Tutorials Library');
    await page.getByLabel('View Search Form').click();
    await expect(page.getByPlaceholder('Search …')).toBeVisible();
    await page.getByPlaceholder('Search …').click();
    const searchValue = 'QA';
    await page.getByPlaceholder('Search …').fill('QA', searchValue);
    await page.getByPlaceholder('Search …').press('Enter');
    await expect(page.getByLabel('search', { exact: true })).toHaveValue('QA');
    const enteredValue = await page.$eval('input.gsc-input#gsc-i-id1', el => el.value);
    await expect(enteredValue).toBe(searchValue);
  });

test('test Categories surfing', async ({ page }) => {
    test.slow();
    await page.waitForTimeout(1000)
    const selector = await page.$('#menu-item-3173 > a > span');
    const spanText = await selector.textContent();
    expect(spanText).toContain('Testing');
    await page.mouse.move(10, 10);
    await page.waitForSelector('#menu-item-3173 > a > span', { timeout: 20000 });
    await page.click('#menu-item-3173 > a > span'); 
    await page.waitForTimeout(3000)
    await expect(page.getByRole('link', { name: 'Postman' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#menu-item-4646')).toContainText('Postman');
    await page.getByRole('link', { name: 'Postman' }).click({ timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Postman');
    await page.getByRole('link', { name: 'SAP Expand child menu of SAP' })
    await page.mouse.move(10, 10);
    await page.waitForSelector('#menu-item-3174 > a > span', { timeout: 20000 });
    await page.click(`#menu-item-3174 > a > span`);
    await page.waitForTimeout(3000)    
    await expect(page.getByRole('link', { name: 'Security Tutorial' })).toBeVisible();
    await page.waitForSelector('#menu-item-4744 > a', { state: 'visible', timeout: 30000 })
    await expect(page.getByRole('link', { name: 'Security Tutorial' })).toContainText('Security');
    // await expect(page.locator('(//a[text()="Security Tutorial"])[1]"]')).toBeVisible({ timeout: 10000 });
    // await expect(page.locator('(//a[text()="Security Tutorial"])[1]')).toContainText('Security');
    await page.getByRole('link', { name: 'Security Tutorial' }).click();
    await expect(page.getByRole('heading', { name: 'What is SAP Security? Complete Tutorial' })).toBeVisible();
    await expect(page.locator('h1')).toContainText('Security');
});
test('test Localization', async ({ page }) => {
    test.slow();
    await page.waitForTimeout(1000);
    await page.mouse.move(10, 10);
    await expect(page.getByRole('heading', { name: 'Guru99 is totally new kind of' })).toBeVisible();
    await expect(page.locator('h3')).toContainText('Guru99 is totally new kind of learning experience.');
    await page.waitForTimeout(3000)
    await page.mouse.move(10, 10);
    await page.click('div.gt_selected a[href]');
    await page.getByRole('link', { name: 'de German' }).click({ timeout: 10000 });
    await page.waitForTimeout(2000);
    await expect(page.getByRole('heading', { name: 'Guru99 ist eine völlig neue' })).toBeVisible();
    await expect(page.locator('h3')).toContainText('Guru99 ist eine völlig neue Art der Lernerfahrung.');
    await page.mouse.move(10, 10);
    await page.click(`div.gt_selected a[href]`);
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'ja Japanese' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Guru99 はまったく新しい種類の学習体験です。' })).toBeVisible();
    await expect(page.locator('h3')).toContainText('Guru99 はまったく新しい種類の学習体験です。');
    await page.waitForTimeout(3000)
    await page.mouse.move(10, 10);
    await page.click('div.gt_selected a[href]');
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'fr French' }).click({ force: true });
    await expect(page.getByRole('heading', { name: 'Guru99 est un tout nouveau' })).toBeVisible();
    await expect(page.locator('h3')).toContainText('Guru99 est un tout nouveau type d\'expérience d\'apprentissage.');
  });


  test('test xpath locator', async ({page}) => {
    await page.locator("xpath=//a[@href='/tensorflow-tutorial.html'][text()='➤ TensorFlow']").click()
    await expect(page.locator('//h2[text()="What is TensorFlow?"]')).toBeVisible()
  })

  test('test 4', async ({page}) => {
    const linkNltk = page.locator('a[href="/nltk-tutorial.html"]')
    const articalAdded = page.locator("xpath=//time")
    const textNtlkSylabus = page.locator("xpath=//h2[text()='NLTK Tutorial Syllabus']")
    const tutorialLink = page.locator('tr td a')
    const textWhatIsSeq = page.locator("xpath=//h2[text()='What is Seq2Seq?']")

    await linkNltk.waitFor({state: 'visible', timeout: 5000})
    await linkNltk.click()
    await expect(articalAdded).toContainText('December 2, 2023')
    await textNtlkSylabus.press('Enter')
    await page.mouse.move(10, 10);
    await tutorialLink.nth(7).click()
    await textWhatIsSeq.waitFor({state: 'visible', timeout: 5000})
    await expect(textWhatIsSeq).toBeVisible()
  })
  test.skip('test5', async({ page }) =>{
    const textWhatIsSeq = page.locator("xpath=//h2[text()='What is Seq2Seq?']")
    const textWhatIsSeq33 = page.locator("xpath=//h2[text()='What is Seq2Seq33?']")

    await page.goto('/seq2seq-model.html')
    if (await textWhatIsSeq33.isVisible()) {
      await page.locator('NON.VISIBLE.LOCATOR').click()
    }
    await expect (textWhatIsSeq).toBeVisible()
  })

  test.skip('Test for Headed mode', async({ page }) => { 
    const input = page.locator('input.gsc-input')

    await input.click()
    await input.fill('sap')
    await input.clear()
    await input.pressSequentially('SAP')
    await input.pressSequentially('Tutorial', {delay:200})

  }),


  test('test HomeTask in Headless Mode', async ({ page }) => {
      // const context = await browser.newContext({ headless: true });
      // const page = await context.newPage();
      const searchInput = page.locator("input.gsc-input")
      if (await searchInput.isVisible()) {
        await page.locator('input.gsc-input').fill('sap')
        await page.locator('input.gsc-input').clear()
        await page.locator('input.gsc-input').fill('SAP')
        await page.locator('input.gsc-input').fill('Tutorial')
      }
      await page.mouse.move(10, 10);
      await page.locator('div.g-content').screenshot({path: 'screenshots/header-with-search-screenshot.png'})
      await expect(page).toHaveScreenshot('main-page-screenshot.png')
      await expect(searchInput).toBeVisible()
      await page.waitForSelector('.gsc-input-box', { state: 'visible', timeout: 30000 })
      await searchInput.fill('sap')
      await searchInput.clear()
      await searchInput.fill('SAP')
      await searchInput.fill('Tutorial')
      await page.waitForTimeout(200);
      await page.screenshot({path: 'screenshots/headless-test-screenshot.png' });

})

})

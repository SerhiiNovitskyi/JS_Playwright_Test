const { test, expect } = require('@playwright/test')

exports.MainPageNewborn = class MainPageNewborn {

    /** 
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
    this.logout = page.locator('li > a.waves.effect', {hasText: 'Вийти'})
    }

    async verifyLogoutVisible() {
        await expect(this.logoutLink).toBeVisible()
    }
}
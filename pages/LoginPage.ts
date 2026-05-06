import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(user: string, password: string) {
    await this.page.locator('#user-name').fill(user);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#login-button').click();
  }

  async errorIsVisible(text: string) {
    await this.page.locator('[data-test="error"]').isVisible();
  }
}

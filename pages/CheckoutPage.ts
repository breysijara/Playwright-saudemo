import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInformation(first: string, last: string, zip: string) {
    await this.page.locator('#first-name').fill(first);
    await this.page.locator('#last-name').fill(last);
    await this.page.locator('#postal-code').fill(zip);
    await this.page.locator('#continue').click();
  }

  async finish() {
    await this.page.locator('#finish').click();
  }

  async verifySuccess() {
    await expect(
      this.page.getByText('Thank you for your order')
    ).toBeVisible();
  }
}

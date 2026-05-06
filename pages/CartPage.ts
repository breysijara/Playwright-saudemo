import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyProductInCart(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async checkout() {
    await this.page.locator('#checkout').click();
  }
}

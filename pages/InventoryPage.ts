import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async addProductByName(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await expect(product).toBeVisible();

    await product.locator('button').click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
  await this.page.locator('.product_sort_container').selectOption(value);
}

async getFirstProductName(): Promise<string> {
  return this.page.locator('.inventory_item_name').first().innerText();
}


  
}

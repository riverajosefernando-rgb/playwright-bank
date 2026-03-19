import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addFirstItemToCart() {
    await this.page.click('.inventory_item:first-child button');
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
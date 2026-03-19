import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('Flujo compra', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await loginPage.goTo();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventory.addFirstItemToCart();
  await inventory.goToCart();

  await page.click('#checkout');

  await page.fill('#first-name', 'Jose');
  await page.fill('#last-name', 'Rivera');
  await page.fill('#postal-code', '760001');

  await page.click('#continue');
  await page.click('#finish');

  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});
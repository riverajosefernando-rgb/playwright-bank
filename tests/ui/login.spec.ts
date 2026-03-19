import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Login exitoso UI', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});
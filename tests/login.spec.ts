import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../data/users.json';

users.forEach(({ user, password }) => {
  test(`Login con ${user}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.login(user, password);

    if (user === 'locked_out_user') {
      await expect(page.getByText('Epic sadface')).toBeVisible();
    }
  });
});

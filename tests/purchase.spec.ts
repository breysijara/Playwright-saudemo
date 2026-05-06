import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Compra un producto buscando por nombre', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goTo();
  await login.login('standard_user', 'secret_sauce');

  await inventory.isLoaded();
  await inventory.addProductByName('Sauce Labs Backpack');
  await inventory.goToCart();

  await cart.verifyProductInCart('Sauce Labs Backpack');
  await cart.checkout();

  await checkout.fillInformation('Breysi', 'QA', '15001');
  await checkout.finish();
  await checkout.verifySuccess();
});

/* =========================
   HAPPY PATH 1
   Compra de 1 producto
========================= */
test('HP1 – Compra de un producto', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goTo();
  await login.login('standard_user', 'secret_sauce');

  await inventory.isLoaded();
  await inventory.addProductByName('Sauce Labs Backpack');
  await inventory.goToCart();

  await cart.verifyProductInCart('Sauce Labs Backpack');
  await cart.checkout();

  await checkout.fillInformation('Breysi', 'QA', '15001');
  await checkout.finish();
  await checkout.verifySuccess();
});

/* =========================
   HAPPY PATH 2
   Compra de múltiples productos
========================= */
test('HP2 – Compra de múltiples productos', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goTo();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addProductByName('Sauce Labs Backpack');
  await inventory.addProductByName('Sauce Labs Bike Light');
  await inventory.goToCart();

  await cart.verifyProductInCart('Sauce Labs Backpack');
  await cart.verifyProductInCart('Sauce Labs Bike Light');
  await cart.checkout();

  await checkout.fillInformation('Breysi', 'QA', '15001');
  await checkout.finish();
  await checkout.verifySuccess();
});

/* =========================
   HAPPY PATH 3
   Ordenar y comprar el más barato
========================= */
test('HP3 – Ordenar por precio y comprar', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goTo();
  await login.login('standard_user', 'secret_sauce');

  await inventory.sortBy('lohi'); // low → high
  const cheapest = await inventory.getFirstProductName();
  await inventory.addProductByName(cheapest);
  await inventory.goToCart();

  await cart.verifyProductInCart(cheapest);
  await cart.checkout();

  await checkout.fillInformation('Breysi', 'QA', '15001');
  await checkout.finish();
  await checkout.verifySuccess();
});

/* =========================
   HAPPY PATH 4
   Persistencia del carrito
========================= */
test('HP4 – Persistencia del carrito', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goTo();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addProductByName('Sauce Labs Backpack');
  await page.reload(); // simula refresh
  await inventory.goToCart();

  await cart.verifyProductInCart('Sauce Labs Backpack');
  await cart.checkout();

  await checkout.fillInformation('Breysi', 'QA', '15001');
  await checkout.finish();
  await checkout.verifySuccess();
});

/* =========================
   HAPPY PATH 5
   Reutilizando sesión (auth.json)
========================= */
test.use({ storageState: 'auth.json' });

test('HP5 – Compra con sesión reutilizada', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await page.goto('/inventory.html');

  await inventory.addProductByName('Sauce Labs Backpack');
  await inventory.goToCart();

  await cart.verifyProductInCart('Sauce Labs Backpack');
  await cart.checkout();

  await checkout.fillInformation('Breysi', 'QA', '15001');
  await checkout.finish();
  await checkout.verifySuccess();
});

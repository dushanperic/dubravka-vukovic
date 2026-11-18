import { expect, test } from '@playwright/test';

const basePath = '/dubravka-vukovic/en';

test('Navigates between pages from the primary navigation', async ({
  page,
}) => {
  await page.goto(`${basePath}/`);

  const navigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });

  await navigation.getByRole('link', { name: 'Legal Areas' }).click();
  await expect(page).toHaveURL(`${basePath}/areas`);
  await expect(page).toHaveTitle('Legal Areas | Lawyer Dubravka Vuković');

  await navigation.getByRole('link', { name: 'Biography' }).click();
  await expect(page).toHaveURL(`${basePath}/about`);
  await expect(page).toHaveTitle('Biography | Lawyer Dubravka Vuković');

  await navigation.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(`${basePath}/contact`);
  await expect(page).toHaveTitle('Contact | Lawyer Dubravka Vuković');
});

test('Opens the mobile navigation and navigates to a page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${basePath}/`);

  const menuButton = page.getByRole('button', {
    name: 'Toggle navigation menu',
  });

  const topLine = menuButton.locator('.navigation-menu-line-top');

  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect
    .poll(() => topLine.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe('none');

  await page.keyboard.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();

  const navigation = page.getByRole('navigation', {
    name: 'Primary navigation',
  });
  await expect(navigation).toBeVisible();

  await navigation.getByRole('link', { name: 'Biography' }).click();
  await expect(page).toHaveURL(`${basePath}/about`);
});

test('Skip link navigates to the main content', async ({ page }) => {
  await page.goto(`${basePath}/`);

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();

  await skipLink.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.getByRole('main')).toHaveJSProperty('id', 'main');
});

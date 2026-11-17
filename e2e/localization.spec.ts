import { expect, test } from '@playwright/test';

test('Renders home page in three languages', async ({ page }) => {
  const pages = [
    ['/dubravka-vukovic/en', 'Lawyer Dubravka Vuković'],
    ['/dubravka-vukovic/sr-Cyrl-RS/', 'Адвокат Дубравка Вуковић'],
    ['/dubravka-vukovic/sr-Latn/', 'Advokat Dubravka Vuković'],
  ];

  for (const [path, title] of pages) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
  }
});

test('Select language with LangPicker', async ({ page }) => {
  await page.goto('/dubravka-vukovic/sr-Cyrl-RS/');

  const picker = page.getByRole('group', { name: 'Језик' });
  await expect(picker.getByRole('link', { name: 'Срб' })).toHaveAttribute(
    'aria-current',
    'page',
  );

  await picker.getByRole('link', { name: 'Srb' }).click();

  await expect(page).toHaveURL(/\/dubravka-vukovic\/sr-Latn\/$/);
});

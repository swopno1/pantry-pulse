import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should update preferences when clicked', async ({ page }) => {
  // Add an ingredient first to show the preferences component
  const input = page.getByPlaceholder(/Type an ingredient/i);
  await input.fill('rice');
  await input.press('Enter');

  // Check initial state
  const italianButton = page.getByRole('button', { name: 'Select Italian cuisine' });
  await expect(italianButton).not.toHaveClass(/bg-amber/);

  // Click a cuisine
  await italianButton.click();
  await expect(italianButton).toHaveClass(/bg-amber/);

  // Click a cooking style
  const comfortFoodButton = page.getByRole('button', { name: 'Select Comfort Food cooking style' });
  await expect(comfortFoodButton).not.toHaveClass(/bg-amber/);
  await comfortFoodButton.click();
  await expect(comfortFoodButton).toHaveClass(/bg-amber/);

  // Click a spice level
  const hotSpiceButton = page.getByRole('button', { name: 'Select Hot spice level' });
  await expect(hotSpiceButton).not.toHaveClass(/bg-amber/);
  await hotSpiceButton.click();
  await expect(hotSpiceButton).toHaveClass(/bg-amber/);
});

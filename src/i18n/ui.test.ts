import { describe, expect, it } from 'vitest';
import { languages, ui } from './ui';

describe('translation dictionaries', () => {
  it('has a dictionary for every supported language', () => {
    expect(Object.keys(ui).sort()).toEqual(Object.keys(languages).sort());
  });

  it('has the same translation keys for every language', () => {
    const expectedKeys = Object.keys(ui.en).sort();

    for (const [locale, translations] of Object.entries(ui)) {
      expect(Object.keys(translations).sort(), `locale "${locale}"`).toEqual(
        expectedKeys,
      );
    }
  });
});

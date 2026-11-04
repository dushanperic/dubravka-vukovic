import { describe, expect, it } from 'vitest';
import { defaultLang } from './ui';
import { getLangFromUrl, useTranslations, withBase } from './utils';

describe('withBase', () => {
  it('adds the configured base path to a path with or without a leading slash', () => {
    expect(withBase('/about')).toBe('/dubravka-vukovic/about');
    expect(withBase('about')).toBe('/dubravka-vukovic/about');
  });
});

describe('getLangFromUrl', () => {
  it('reads the locale from a URL under the configured base path', () => {
    const url = new URL('https://example.com/dubravka-vukovic/en/about');

    expect(getLangFromUrl(url)).toBe('en');
  });

  it('returns the default locale when the URL has no supported locale', () => {
    const url = new URL('https://example.com/dubravka-vukovic/fr/about');

    expect(getLangFromUrl(url)).toBe(defaultLang);
  });
});

describe('useTranslations', () => {
  it('returns translations for the requested locale', () => {
    expect(useTranslations('en')('nav.contact')).toBe('Contact');
    expect(useTranslations('sr-Latn')('nav.contact')).toBe('Kontakt');
  });
});

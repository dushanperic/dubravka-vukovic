import { ui, defaultLang } from './ui';

export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalizedPath = `/${path.replace(/^\/+/, '')}`;

  return `${base}${normalizedPath}`;
}

export function getLangFromUrl(url: URL) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname =
    base && url.pathname.startsWith(`${base}/`)
      ? url.pathname.slice(base.length)
      : url.pathname;
  const [, lang] = pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

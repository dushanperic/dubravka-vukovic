import { withBase } from '../i18n/utils';

export const getLocalizedURL = (lang: string, currentPath: string) => {
  const segments = currentPath.split('/').filter(Boolean);
  const locale = segments[0];

  return withBase(currentPath.replace(`/${locale}`, `/${lang}`));
};

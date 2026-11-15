export const LAYOUT_TYPE_KEY = {
  DEFAULT: 'default',
  CENTERED: 'centered',
  COL_3: 'col-3',
} as const;

export type LayoutKeyType =
  (typeof LAYOUT_TYPE_KEY)[keyof typeof LAYOUT_TYPE_KEY];

export const layoutTwClass: Record<LayoutKeyType, string> = {
  [LAYOUT_TYPE_KEY.DEFAULT]:
    'w-full mx-auto mb-78.5 lg:mb-74 bg-(--background) z-10 pb-8 md:pt-50 lg:pt-60',
  [LAYOUT_TYPE_KEY.CENTERED]: 'flex items-center justify-start',
  [LAYOUT_TYPE_KEY.COL_3]:
    'md:grid md:grid-cols-3 md:gap-(--grid-gap) pt-21.5 md:pt-50 lg:pt-60',
};

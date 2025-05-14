export const BTN_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type TButtonSize = typeof BTN_SIZES[keyof typeof BTN_SIZES];

export const BTN_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  OUTLINE_PRIMARY: 'outline-primary',
  OUTLINE_SECONDARY: 'outline-secondary',
} as const;

export type TButtonVariants = typeof BTN_VARIANTS[keyof typeof BTN_VARIANTS];
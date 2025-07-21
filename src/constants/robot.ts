export const HAT_ICONS = {
  none: '',
  sapling: '🌱',
  tophat: '🎩',
  crown: '👑',
  cap: '🧢'
} as const;

export type HatType = keyof typeof HAT_ICONS;
export const colors = {
  // Brand
  primary: '#2F7D68', // deep emerald / teal
  primaryDark: '#1E4A3D', // forest green
  primaryLight: '#5FAE95', // lighter teal
  primarySoft: '#DDEFE7', // tinted mint background for chips/badges

  accent: '#E0A940', // gold
  accentSoft: '#FBEFD2',

  lime: '#DCE87A', // pale yellow-green highlight
  limeSoft: '#F3F7D8',

  // Neutrals
  background: '#FAFAF8', // near-white
  surface: '#FFFFFF',
  surfaceAlt: '#EEF4F0', // pale green-tinted neutral
  border: '#DCE6E0',

  text: '#16261F', // deep green-charcoal
  textMuted: '#57685F',
  textFaint: '#8FA098',
  textOnPrimary: '#FFFFFF',

  success: '#2F7D68',
  successSoft: '#DDEFE7',
  warning: '#E0A940',
  warningSoft: '#FBEFD2',
  danger: '#C24A3F',
  dangerSoft: '#F6DEDA',

  star: '#E0A940',

  overlay: 'rgba(22, 38, 31, 0.55)',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof colors;

export const fonts = {
  // Inter — clean modern sans for UI
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',

  // Poppins — warmer, rounder display face for headings
  display: 'Poppins_500Medium',
  displaySemiBold: 'Poppins_600SemiBold',
  displayBold: 'Poppins_700Bold',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
} as const;

export const lineHeights = {
  xs: 16,
  sm: 18,
  base: 22,
  md: 22,
  lg: 24,
  xl: 26,
  xxl: 30,
  xxxl: 38,
} as const;

export const typography = {
  h1: { fontFamily: fonts.displayBold, fontSize: fontSizes.xxxl, lineHeight: lineHeights.xxxl },
  h2: { fontFamily: fonts.displaySemiBold, fontSize: fontSizes.xxl, lineHeight: lineHeights.xxl },
  h3: { fontFamily: fonts.displaySemiBold, fontSize: fontSizes.xl, lineHeight: lineHeights.xl },
  h4: { fontFamily: fonts.display, fontSize: fontSizes.lg, lineHeight: lineHeights.lg },
  bodyLg: { fontFamily: fonts.body, fontSize: fontSizes.md, lineHeight: lineHeights.md },
  body: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: lineHeights.base },
  bodySm: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: lineHeights.sm },
  caption: { fontFamily: fonts.body, fontSize: fontSizes.xs, lineHeight: lineHeights.xs },
  button: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.base, lineHeight: lineHeights.base },
  label: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.xs, lineHeight: lineHeights.xs },
} as const;

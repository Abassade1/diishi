import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

interface TagProps {
  label: string;
  tone?: 'primary' | 'accent' | 'neutral' | 'success';
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

export function Tag({ label, tone = 'neutral', size = 'sm', style }: TagProps) {
  return (
    <View style={[styles.base, toneStyles[tone], size === 'md' && styles.md, style]}>
      <Text style={[styles.label, { color: toneTextColor[tone] }, size === 'md' && styles.mdLabel]}>
        {label}
      </Text>
    </View>
  );
}

const toneTextColor = {
  primary: colors.primary,
  accent: colors.primaryDark,
  neutral: colors.textMuted,
  success: colors.success,
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  md: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.xs,
  },
  mdLabel: {
    fontSize: fontSizes.sm,
  },
});

const toneStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primarySoft },
  accent: { backgroundColor: colors.accentSoft },
  neutral: { backgroundColor: colors.surfaceAlt },
  success: { backgroundColor: colors.successSoft },
});

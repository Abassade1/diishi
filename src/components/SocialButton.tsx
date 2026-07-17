import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type SocialKind = 'google' | 'facebook' | 'x';

interface SocialButtonProps {
  kind: SocialKind;
  label: string;
  onPress: () => void;
  loading?: boolean;
}

const ICONS: Record<SocialKind, { name: keyof typeof Ionicons.glyphMap; color: string } | null> = {
  google: { name: 'logo-google', color: '#EA4335' },
  facebook: { name: 'logo-facebook', color: '#1877F2' },
  x: null,
};

export function SocialButton({ kind, label, onPress, loading }: SocialButtonProps) {
  const icon = ICONS[kind];

  return (
    <Pressable onPress={onPress} disabled={loading} style={[styles.button, loading && styles.buttonDisabled]}>
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <>
          {icon ? (
            <Ionicons name={icon.name} size={18} color={icon.color} style={styles.icon} />
          ) : (
            <View style={styles.xIconWrap}>
              <Text style={styles.xIconText}>𝕏</Text>
            </View>
          )}
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingVertical: 13,
    paddingHorizontal: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: spacing.sm,
  },
  xIconWrap: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  xIconText: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.text,
    fontFamily: fonts.bodyBold,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
});

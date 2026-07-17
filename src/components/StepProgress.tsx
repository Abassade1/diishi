import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

interface StepProgressProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <View>
      <View style={styles.track}>
        {steps.map((_, index) => {
          const isActive = index <= currentStep;
          return (
            <View key={index} style={styles.segmentWrap}>
              <View style={[styles.segment, isActive && styles.segmentActive]} />
            </View>
          );
        })}
      </View>
      <Text style={styles.stepLabel}>
        Step {currentStep + 1} of {steps.length} · {steps[currentStep]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    gap: spacing.xxs,
  },
  segmentWrap: {
    flex: 1,
  },
  segment: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.border,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
});

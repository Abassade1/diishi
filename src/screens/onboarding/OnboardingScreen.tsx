import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, Button, StepProgress } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import {
  cookingCadenceOptions,
  dietaryPreferenceOptions,
  householdSizeOptions,
} from '@/data/onboardingOptions';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const STEPS = ['Household', 'Diet', 'Cadence'];

export function OnboardingScreen({ navigation }: Props) {
  const { preferences, setPreferences, completeOnboarding } = useAppContext();
  const [step, setStep] = useState(0);

  const canContinue =
    (step === 0 && preferences.householdSize !== null) ||
    (step === 1 && preferences.dietaryPreferences.length > 0) ||
    (step === 2 && preferences.cookingCadence !== null);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }
  };

  const toggleDietary = (label: string) => {
    const exists = preferences.dietaryPreferences.includes(label);
    if (label === 'No restrictions') {
      setPreferences({ dietaryPreferences: exists ? [] : ['No restrictions'] });
      return;
    }
    const withoutNoRestrictions = preferences.dietaryPreferences.filter((p) => p !== 'No restrictions');
    setPreferences({
      dietaryPreferences: exists
        ? withoutNoRestrictions.filter((p) => p !== label)
        : [...withoutNoRestrictions, label],
    });
  };

  return (
    <Screen>
      <View style={styles.header}>
        <StepProgress steps={STEPS} currentStep={step} />
      </View>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {step === 0 && (
          <View>
            <Text style={styles.title}>How many people are you cooking for?</Text>
            <Text style={styles.subtitle}>This helps us size each visit and portion recommendations.</Text>
            <View style={styles.optionList}>
              {householdSizeOptions.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setPreferences({ householdSize: opt.value })}
                  style={[
                    styles.optionRow,
                    preferences.householdSize === opt.value && styles.optionRowSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      preferences.householdSize === opt.value && styles.optionLabelSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {preferences.householdSize === opt.value && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text style={styles.title}>Any dietary preferences?</Text>
            <Text style={styles.subtitle}>Select all that apply — we'll only match chefs who can accommodate them.</Text>
            <View style={styles.chipGrid}>
              {dietaryPreferenceOptions.map((opt) => {
                const selected = preferences.dietaryPreferences.includes(opt.label);
                return (
                  <Pressable
                    key={opt.label}
                    onPress={() => toggleDietary(opt.label)}
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Ionicons
                      name={opt.icon as keyof typeof Ionicons.glyphMap}
                      size={18}
                      color={selected ? colors.white : colors.primary}
                      style={styles.chipIcon}
                    />
                    <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.title}>How often should a chef visit?</Text>
            <Text style={styles.subtitle}>You can change this anytime from your bookings.</Text>
            <View style={styles.optionList}>
              {cookingCadenceOptions.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setPreferences({ cookingCadence: opt.value })}
                  style={[
                    styles.optionRow,
                    preferences.cookingCadence === opt.value && styles.optionRowSelected,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.optionLabel,
                        preferences.cookingCadence === opt.value && styles.optionLabelSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text style={styles.optionDescription}>{opt.description}</Text>
                  </View>
                  {preferences.cookingCadence === opt.value && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label={step < STEPS.length - 1 ? 'Continue' : 'Find my chef'}
          onPress={handleNext}
          disabled={!canContinue}
          icon="arrow-forward"
          iconPosition="right"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  optionList: {
    gap: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  optionRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  optionLabelSelected: {
    color: colors.primaryDark,
  },
  optionDescription: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipIcon: {
    marginRight: spacing.xxs,
  },
  chipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  chipLabelSelected: {
    color: colors.white,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

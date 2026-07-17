import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingFlowParamList } from '@/navigation/types';
import { Screen, ScreenHeader, StepProgress, Button } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { serviceOptions } from './serviceOptions';

type Props = NativeStackScreenProps<BookingFlowParamList, 'SelectService'>;

const STEPS = ['Service', 'Chef', 'Menu', 'Schedule', 'Confirm'];

export function SelectServiceScreen({ navigation }: Props) {
  const { bookingDraft, updateBookingDraft } = useAppContext();

  const handleSelect = (id: string, frequency: 'Weekly' | 'Bi-weekly' | 'Monthly') => {
    updateBookingDraft({ serviceType: id, frequency });
  };

  return (
    <Screen>
      <ScreenHeader title="Book a chef" onBack={() => navigation.getParent()?.goBack()} />
      <View style={styles.progressWrap}>
        <StepProgress steps={STEPS} currentStep={0} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>What kind of visit do you need?</Text>
        {serviceOptions.map((opt) => {
          const selected = bookingDraft.serviceType === opt.id;
          return (
            <Pressable
              key={opt.id}
              onPress={() => handleSelect(opt.id, opt.suggestedFrequency)}
              style={[styles.card, selected && styles.cardSelected]}
            >
              <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
                <Ionicons name={opt.icon} size={22} color={selected ? colors.white : colors.primary} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{opt.title}</Text>
                <Text style={styles.cardDescription}>{opt.description}</Text>
              </View>
              {selected && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={() => navigation.navigate('SelectChef')}
          disabled={!bookingDraft.serviceType}
          icon="arrow-forward"
          iconPosition="right"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressWrap: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xl,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  iconWrapSelected: {
    backgroundColor: colors.primary,
  },
  cardBody: {
    flex: 1,
    marginRight: spacing.xs,
  },
  cardTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  cardDescription: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

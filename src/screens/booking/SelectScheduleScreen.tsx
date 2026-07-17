import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingFlowParamList } from '@/navigation/types';
import { Screen, ScreenHeader, StepProgress, Button } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { Booking } from '@/types';

type Props = NativeStackScreenProps<BookingFlowParamList, 'SelectSchedule'>;

const STEPS = ['Service', 'Chef', 'Menu', 'Schedule', 'Confirm'];
const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const FREQUENCIES: Booking['frequency'][] = ['Weekly', 'Bi-weekly', 'Monthly'];

function nextDays(count: number) {
  const days: { iso: string; label: string; dayNum: string }[] = [];
  const today = new Date('2026-07-16T00:00:00');
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    days.push({ iso, label, dayNum });
  }
  return days;
}

export function SelectScheduleScreen({ navigation }: Props) {
  const { bookingDraft, updateBookingDraft } = useAppContext();
  const days = useMemo(() => nextDays(14), []);

  const canContinue =
    !!bookingDraft.date && !!bookingDraft.time && bookingDraft.address.trim().length > 3;

  const adjustGuests = (delta: number) => {
    updateBookingDraft({ guestCount: Math.max(1, bookingDraft.guestCount + delta) });
  };

  return (
    <Screen>
      <ScreenHeader title="Choose a schedule" onBack={() => navigation.goBack()} />
      <View style={styles.progressWrap}>
        <StepProgress steps={STEPS} currentStep={3} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Select a date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateRow}>
          {days.map((day) => {
            const selected = bookingDraft.date === day.iso;
            return (
              <Pressable
                key={day.iso}
                onPress={() => updateBookingDraft({ date: day.iso })}
                style={[styles.dateCard, selected && styles.dateCardSelected]}
              >
                <Text style={[styles.dateDay, selected && styles.dateTextSelected]}>{day.label}</Text>
                <Text style={[styles.dateNum, selected && styles.dateTextSelected]}>{day.dayNum}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.label}>Select a time</Text>
        <View style={styles.chipGrid}>
          {TIME_SLOTS.map((time) => {
            const selected = bookingDraft.time === time;
            return (
              <Pressable
                key={time}
                onPress={() => updateBookingDraft({ time })}
                style={[styles.timeChip, selected && styles.timeChipSelected]}
              >
                <Text style={[styles.timeChipLabel, selected && styles.timeChipLabelSelected]}>
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.recurringRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Make this recurring</Text>
            <Text style={styles.helperText}>We'll auto-schedule future visits on this cadence.</Text>
          </View>
          <Switch
            value={bookingDraft.recurring}
            onValueChange={(value) => updateBookingDraft({ recurring: value })}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor={colors.white}
          />
        </View>

        {bookingDraft.recurring && (
          <View style={styles.chipGrid}>
            {FREQUENCIES.map((freq) => {
              const selected = bookingDraft.frequency === freq;
              return (
                <Pressable
                  key={freq}
                  onPress={() => updateBookingDraft({ frequency: freq })}
                  style={[styles.timeChip, selected && styles.timeChipSelected]}
                >
                  <Text style={[styles.timeChipLabel, selected && styles.timeChipLabelSelected]}>
                    {freq}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <Text style={styles.label}>Guests</Text>
        <View style={styles.stepperRow}>
          <Pressable onPress={() => adjustGuests(-1)} style={styles.stepperButton}>
            <Ionicons name="remove" size={18} color={colors.primary} />
          </Pressable>
          <Text style={styles.stepperValue}>{bookingDraft.guestCount}</Text>
          <Pressable onPress={() => adjustGuests(1)} style={styles.stepperButton}>
            <Ionicons name="add" size={18} color={colors.primary} />
          </Pressable>
        </View>

        <Text style={styles.label}>Delivery address</Text>
        <TextInput
          value={bookingDraft.address}
          onChangeText={(text) => updateBookingDraft({ address: text })}
          placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
          placeholderTextColor={colors.textFaint}
          style={styles.addressInput}
          multiline
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={() => navigation.navigate('ConfirmBooking')}
          disabled={!canContinue}
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
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  helperText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  dateRow: {
    marginTop: -spacing.xs,
  },
  dateCard: {
    width: 58,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  dateCardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateDay: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  dateNum: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
    marginTop: 2,
  },
  dateTextSelected: {
    color: colors.white,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  timeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  timeChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeChipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  timeChipLabelSelected: {
    color: colors.white,
  },
  recurringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.lg,
    color: colors.text,
    marginHorizontal: spacing.lg,
    minWidth: 24,
    textAlign: 'center',
  },
  addressInput: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

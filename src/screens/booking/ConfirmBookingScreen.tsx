import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingFlowParamList } from '@/navigation/types';
import { Screen, ScreenHeader, StepProgress, Button, Card } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { getChefById, getDishById } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { formatDateLong, formatNaira } from '@/utils/format';
import { serviceOptions } from './serviceOptions';

type Props = NativeStackScreenProps<BookingFlowParamList, 'ConfirmBooking'>;

const STEPS = ['Service', 'Chef', 'Menu', 'Schedule', 'Confirm'];

export function ConfirmBookingScreen({ navigation }: Props) {
  const { bookingDraft } = useAppContext();
  const chef = bookingDraft.chefId ? getChefById(bookingDraft.chefId) : undefined;
  const service = serviceOptions.find((s) => s.id === bookingDraft.serviceType);
  const dishes = bookingDraft.dishIds.map(getDishById).filter(Boolean);

  if (!chef) return null;

  return (
    <Screen>
      <ScreenHeader title="Confirm your booking" onBack={() => navigation.goBack()} />
      <View style={styles.progressWrap}>
        <StepProgress steps={STEPS} currentStep={4} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.chefCard}>
          <Image source={{ uri: chef.avatar }} style={styles.chefAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.chefName}>{chef.name}</Text>
            <Text style={styles.chefArea}>{chef.area}, {chef.city}</Text>
          </View>
        </Card>

        <View style={styles.summaryCard}>
          <SummaryRow icon="restaurant-outline" label="Service" value={service?.title ?? '—'} />
          <SummaryRow
            icon="calendar-outline"
            label="Date & time"
            value={bookingDraft.date ? `${formatDateLong(bookingDraft.date)}, ${bookingDraft.time}` : '—'}
          />
          <SummaryRow
            icon="repeat-outline"
            label="Recurrence"
            value={bookingDraft.recurring ? `${bookingDraft.frequency}` : 'One-time visit'}
          />
          <SummaryRow icon="people-outline" label="Guests" value={`${bookingDraft.guestCount}`} />
          <SummaryRow icon="location-outline" label="Address" value={bookingDraft.address || '—'} />
        </View>

        <Text style={styles.sectionTitle}>Menu for this visit</Text>
        <View style={styles.summaryCard}>
          {dishes.length === 0 && <Text style={styles.emptyText}>No dishes selected</Text>}
          {dishes.map((dish) => (
            <View key={dish!.id} style={styles.dishRow}>
              <Image source={{ uri: dish!.image }} style={styles.dishThumb} />
              <Text style={styles.dishName}>{dish!.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Total for this visit</Text>
          <Text style={styles.priceValue}>{formatNaira(chef.pricePerVisit)}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label="Proceed to payment"
          onPress={() => navigation.getParent()?.navigate('Payment')}
          icon="arrow-forward"
          iconPosition="right"
        />
      </View>
    </Screen>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <View style={styles.summaryIconWrap}>
        <Ionicons name={icon} size={16} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </View>
    </View>
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
  chefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  chefAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  chefName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  chefArea: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  summaryIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  summaryLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  summaryValue: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
    marginTop: 1,
  },
  sectionTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textFaint,
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dishThumb: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  dishName: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  priceLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.primaryDark,
  },
  priceValue: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xl,
    color: colors.primaryDark,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

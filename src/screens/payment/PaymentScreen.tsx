import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, Card } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { getChefById } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { formatDate, formatNaira } from '@/utils/format';
import { Booking } from '@/types';
import { serviceOptions } from '@/screens/booking/serviceOptions';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

type PlanOption = 'per-visit' | 'monthly-subscription';
type PaymentChannel = 'card' | 'bank-transfer' | 'ussd';

const CHANNELS: { id: PaymentChannel; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'card', label: 'Debit / Credit Card', icon: 'card-outline' },
  { id: 'bank-transfer', label: 'Bank Transfer', icon: 'business-outline' },
  { id: 'ussd', label: 'USSD', icon: 'keypad-outline' },
];

export function PaymentScreen({ navigation }: Props) {
  const { bookingDraft, addBooking, resetBookingDraft } = useAppContext();
  const chef = bookingDraft.chefId ? getChefById(bookingDraft.chefId) : undefined;
  const [plan, setPlan] = useState<PlanOption>('per-visit');
  const [channel, setChannel] = useState<PaymentChannel>('card');
  const [processing, setProcessing] = useState(false);

  if (!chef) return null;

  const perVisitPrice = chef.pricePerVisit;
  const subscriptionPrice = Math.round(perVisitPrice * 4 * 0.9); // 10% off for 4-visit bundle
  const amountDue = plan === 'per-visit' ? perVisitPrice : subscriptionPrice;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        chefId: chef.id,
        status: 'upcoming',
        serviceType:
          serviceOptions.find((s) => s.id === bookingDraft.serviceType)?.title ?? 'Weekly Meal Prep',
        date: bookingDraft.date ?? '2026-07-20',
        time: bookingDraft.time ?? '10:00 AM',
        recurring: bookingDraft.recurring,
        frequency: bookingDraft.frequency ?? undefined,
        address: bookingDraft.address,
        guestCount: bookingDraft.guestCount,
        dishes: bookingDraft.dishIds,
        price: perVisitPrice,
      };
      addBooking(newBooking);
      resetBookingDraft();
      setProcessing(false);
      navigation.reset({
        index: 1,
        routes: [{ name: 'MainTabs' }, { name: 'BookingConfirmed' }],
      });
    }, 1400);
  };

  return (
    <Screen>
      <ScreenHeader title="Payment" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{chef.name}</Text>
          <Text style={styles.summarySubtitle}>
            {bookingDraft.date ? formatDate(bookingDraft.date) : 'Date TBC'} · {bookingDraft.time ?? '—'}
          </Text>
        </Card>

        <Text style={styles.label}>Choose a plan</Text>
        <Pressable
          onPress={() => setPlan('per-visit')}
          style={[styles.planCard, plan === 'per-visit' && styles.planCardSelected]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.planTitle}>Pay per visit</Text>
            <Text style={styles.planDescription}>Charged after each completed visit</Text>
          </View>
          <Text style={styles.planPrice}>{formatNaira(perVisitPrice)}</Text>
        </Pressable>
        <Pressable
          onPress={() => setPlan('monthly-subscription')}
          style={[styles.planCard, plan === 'monthly-subscription' && styles.planCardSelected]}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.planTitleRow}>
              <Text style={styles.planTitle}>Monthly subscription</Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Save 10%</Text>
              </View>
            </View>
            <Text style={styles.planDescription}>4 visits billed upfront, cancel anytime</Text>
          </View>
          <Text style={styles.planPrice}>{formatNaira(subscriptionPrice)}</Text>
        </Pressable>

        <Text style={styles.label}>Payment method</Text>
        {CHANNELS.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => setChannel(c.id)}
            style={[styles.channelRow, channel === c.id && styles.channelRowSelected]}
          >
            <Ionicons name={c.icon} size={20} color={channel === c.id ? colors.primary : colors.textMuted} />
            <Text style={[styles.channelLabel, channel === c.id && styles.channelLabelSelected]}>
              {c.label}
            </Text>
            <View style={styles.radioOuter}>
              {channel === c.id && <View style={styles.radioInner} />}
            </View>
          </Pressable>
        ))}

        <View style={styles.paystackBadge}>
          <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
          <Text style={styles.paystackText}>Payments secured by Paystack</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total due</Text>
          <Text style={styles.totalValue}>{formatNaira(amountDue)}</Text>
        </View>
        <Button
          label={processing ? 'Processing…' : `Pay ${formatNaira(amountDue)} with Paystack`}
          onPress={handlePay}
          loading={processing}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  summaryCard: {
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  summarySubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  planTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  planDescription: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  planPrice: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.base,
    color: colors.primaryDark,
  },
  saveBadge: {
    backgroundColor: colors.limeSoft,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radii.pill,
    marginLeft: spacing.xs,
  },
  saveBadgeText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 10,
    color: colors.primaryDark,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  channelRowSelected: {
    borderColor: colors.primary,
  },
  channelLabel: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  channelLabelSelected: {
    color: colors.primaryDark,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  paystackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  paystackText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginLeft: spacing.xxs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  totalLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
  },
  totalValue: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.lg,
    color: colors.text,
  },
});

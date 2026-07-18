import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/types';
import { Screen, Card, Tag, Button } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { getChefById } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { formatDate, formatNaira } from '@/utils/format';
import { Booking } from '@/types';
import { TAB_BAR_BASE_HEIGHT } from '@/navigation/tabBarMetrics';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const TODAY = '2026-07-16';

function monthGrid(monthOffset: number) {
  const base = new Date('2026-07-16T00:00:00');
  const first = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const startWeekday = first.getDay();
  const cells: { iso: string | null; day: number | null }[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ iso: null, day: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = new Date(first.getFullYear(), first.getMonth(), d).toISOString().slice(0, 10);
    cells.push({ iso, day: d });
  }
  return { cells, label: first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) };
}

export function BookingsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { bookings } = useAppContext();
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming');

  const { cells, label } = useMemo(() => monthGrid(0), []);
  const bookingDates = useMemo(
    () => new Set(bookings.filter((b) => b.status === 'upcoming').map((b) => b.date)),
    [bookings]
  );

  const upcoming = bookings
    .filter((b) => b.status === 'upcoming')
    .sort((a, b) => a.date.localeCompare(b.date));
  const history = bookings
    .filter((b) => b.status !== 'upcoming')
    .sort((a, b) => b.date.localeCompare(a.date));

  const list = tab === 'upcoming' ? upcoming : history;

  return (
    <Screen edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings</Text>
      </View>

      <View style={styles.tabRow}>
        <Pressable
          onPress={() => setTab('upcoming')}
          style={[styles.tabButton, tab === 'upcoming' && styles.tabButtonActive]}
        >
          <Text style={[styles.tabLabel, tab === 'upcoming' && styles.tabLabelActive]}>Upcoming</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('history')}
          style={[styles.tabButton, tab === 'history' && styles.tabButtonActive]}
        >
          <Text style={[styles.tabLabel, tab === 'history' && styles.tabLabelActive]}>History</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: TAB_BAR_BASE_HEIGHT + insets.bottom + spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'upcoming' && (
          <View style={styles.calendarCard}>
            <Text style={styles.calendarMonth}>{label}</Text>
            <View style={styles.weekdayRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <Text key={i} style={styles.weekdayLabel}>{d}</Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {cells.map((cell, idx) => {
                const hasBooking = cell.iso ? bookingDates.has(cell.iso) : false;
                const isToday = cell.iso === TODAY;
                return (
                  <View key={idx} style={styles.calendarCell}>
                    {cell.day !== null && (
                      <View style={[styles.dayCircle, isToday && styles.dayCircleToday]}>
                        <Text style={[styles.dayNum, isToday && styles.dayNumToday]}>{cell.day}</Text>
                        {hasBooking && <View style={styles.dayDot} />}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {list.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyStateText}>
              {tab === 'upcoming' ? 'No upcoming visits yet.' : 'No past bookings yet.'}
            </Text>
            {tab === 'upcoming' && (
              <Button
                label="Book a chef"
                onPress={() => navigation.navigate('BookingFlow', {})}
                style={{ marginTop: spacing.md, width: 180 }}
              />
            )}
          </View>
        )}

        {list.map((booking) => (
          <BookingRow key={booking.id} booking={booking} navigation={navigation} />
        ))}
      </ScrollView>
    </Screen>
  );
}

function BookingRow({ booking, navigation }: { booking: Booking; navigation: Nav }) {
  const chef = getChefById(booking.chefId);
  if (!chef) return null;

  const statusTone = booking.status === 'upcoming' ? 'primary' : booking.status === 'completed' ? 'success' : 'neutral';
  const statusLabel = booking.status === 'upcoming' ? 'Upcoming' : booking.status === 'completed' ? 'Completed' : 'Cancelled';

  return (
    <Card
      onPress={() => navigation.navigate('ChefProfile', { chefId: chef.id })}
      style={styles.bookingCard}
    >
      <View style={styles.bookingRow}>
        <Image source={{ uri: chef.avatar }} style={styles.bookingAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.bookingChefName}>{chef.name}</Text>
          <Text style={styles.bookingService}>{booking.serviceType}</Text>
        </View>
        <Tag label={statusLabel} tone={statusTone as any} />
      </View>
      <View style={styles.bookingMetaRow}>
        <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
        <Text style={styles.bookingMetaText}>{formatDate(booking.date)} · {booking.time}</Text>
      </View>
      {booking.recurring && (
        <View style={styles.bookingMetaRow}>
          <Ionicons name="repeat-outline" size={14} color={colors.textMuted} />
          <Text style={styles.bookingMetaText}>{booking.frequency}</Text>
        </View>
      )}
      <View style={styles.bookingFooterRow}>
        <Text style={styles.bookingPrice}>{formatNaira(booking.price)}</Text>
        {booking.status === 'completed' && !booking.rated && (
          <Pressable
            onPress={() => navigation.navigate('RateVisit', { bookingId: booking.id })}
            style={styles.rateButton}
          >
            <Text style={styles.rateButtonText}>Rate visit</Text>
          </Pressable>
        )}
        {booking.status === 'completed' && booking.rated && (
          <View style={styles.ratedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={styles.ratedBadgeText}>Rated</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
  },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.pill,
    padding: 4,
    marginBottom: spacing.md,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.surface,
  },
  tabLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  calendarCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  calendarMonth: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleToday: {
    backgroundColor: colors.primary,
  },
  dayNum: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.text,
  },
  dayNumToday: {
    color: colors.white,
    fontFamily: fonts.bodySemiBold,
  },
  dayDot: {
    position: 'absolute',
    bottom: -1,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyStateText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textFaint,
    marginTop: spacing.sm,
  },
  bookingCard: {
    marginBottom: spacing.md,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bookingAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  bookingChefName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  bookingService: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  bookingMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingMetaText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginLeft: spacing.xxs,
  },
  bookingFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  bookingPrice: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.base,
    color: colors.primaryDark,
  },
  rateButton: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  rateButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.xs,
    color: colors.primaryDark,
  },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratedBadgeText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.xs,
    color: colors.success,
    marginLeft: 4,
  },
});

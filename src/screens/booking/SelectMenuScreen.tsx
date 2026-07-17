import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingFlowParamList } from '@/navigation/types';
import { Screen, ScreenHeader, StepProgress, DishCard, Button } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';
import { getDishesForChef } from '@/data';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<BookingFlowParamList, 'SelectMenu'>;

const STEPS = ['Service', 'Chef', 'Menu', 'Schedule', 'Confirm'];

export function SelectMenuScreen({ navigation }: Props) {
  const { bookingDraft, updateBookingDraft } = useAppContext();
  const dishes = bookingDraft.chefId ? getDishesForChef(bookingDraft.chefId) : [];

  const toggleDish = (dishId: string) => {
    const exists = bookingDraft.dishIds.includes(dishId);
    updateBookingDraft({
      dishIds: exists
        ? bookingDraft.dishIds.filter((id) => id !== dishId)
        : [...bookingDraft.dishIds, dishId],
    });
  };

  return (
    <Screen>
      <ScreenHeader title="Pick your dishes" subtitle="Choose what you'd like this visit" onBack={() => navigation.goBack()} />
      <View style={styles.progressWrap}>
        <StepProgress steps={STEPS} currentStep={2} />
      </View>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            selected={bookingDraft.dishIds.includes(item.id)}
            onToggle={() => toggleDish(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>This chef hasn't listed dishes yet.</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <Text style={styles.summaryText}>
          {bookingDraft.dishIds.length} {bookingDraft.dishIds.length === 1 ? 'dish' : 'dishes'} selected
        </Text>
        <Button
          label="Continue"
          onPress={() => navigation.navigate('SelectSchedule')}
          disabled={bookingDraft.dishIds.length === 0}
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
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyStateText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textFaint,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  summaryText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});

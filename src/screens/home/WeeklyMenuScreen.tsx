import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, DishCard, Button } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { dishes, getChefById } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { Cuisine } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'WeeklyMenu'>;

const CUISINE_FILTERS: (Cuisine | 'All')[] = [
  'All',
  'Yoruba',
  'Igbo',
  'Hausa',
  'Continental',
  'Grills & BBQ',
  'Seafood',
  'Vegan & Plant-based',
  'Pastries & Baking',
];

export function WeeklyMenuScreen({ route, navigation }: Props) {
  const { chefId } = route.params ?? {};
  const chef = chefId ? getChefById(chefId) : undefined;
  const { updateBookingDraft } = useAppContext();
  const [cuisine, setCuisine] = useState<(Cuisine | 'All')>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const availableDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesChef = !chefId || dish.chefIds.includes(chefId);
      const matchesCuisine = cuisine === 'All' || dish.cuisine === cuisine;
      return matchesChef && matchesCuisine;
    });
  }, [cuisine, chefId]);

  const toggleDish = (dishId: string) => {
    setSelectedIds((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  const handleContinue = () => {
    updateBookingDraft({ dishIds: selectedIds, chefId: chefId ?? null });
    navigation.navigate('BookingFlow', { chefId });
  };

  return (
    <Screen>
      <ScreenHeader
        title="Plan this week's menu"
        subtitle={chef ? `Dishes from ${chef.name}` : 'Pick dishes for your next visit'}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={CUISINE_FILTERS}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => {
          const selected = item === cuisine;
          return (
            <Pressable
              onPress={() => setCuisine(item)}
              style={[styles.filterChip, selected && styles.filterChipSelected]}
            >
              <Text style={[styles.filterChipLabel, selected && styles.filterChipLabelSelected]}>
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
      <FlatList
        data={availableDishes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            selected={selectedIds.includes(item.id)}
            onToggle={() => toggleDish(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No dishes match this filter yet.</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>
            {selectedIds.length} {selectedIds.length === 1 ? 'dish' : 'dishes'} selected
          </Text>
        </View>
        <Button
          label="Continue to booking"
          onPress={handleContinue}
          disabled={selectedIds.length === 0}
          icon="arrow-forward"
          iconPosition="right"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  filterChipLabelSelected: {
    color: colors.white,
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
  summaryRow: {
    marginBottom: spacing.sm,
  },
  summaryText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
});

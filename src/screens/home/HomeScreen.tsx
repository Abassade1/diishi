import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ChefCard, Card } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { chefs } from '@/data';
import { Cuisine } from '@/types';
import { useAppContext } from '@/context/AppContext';

type Nav = NativeStackNavigationProp<RootStackParamList>;

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

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user, notifications } = useAppContext();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState<(Cuisine | 'All')>('All');
  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredChefs = useMemo(() => {
    return chefs.filter((chef) => {
      const matchesCuisine = cuisine === 'All' || chef.specialties.includes(cuisine);
      const matchesQuery =
        query.trim().length === 0 ||
        chef.name.toLowerCase().includes(query.toLowerCase()) ||
        chef.area.toLowerCase().includes(query.toLowerCase()) ||
        chef.specialties.some((s) => s.toLowerCase().includes(query.toLowerCase()));
      return matchesCuisine && matchesQuery;
    });
  }, [query, cuisine]);

  return (
    <Screen>
      <FlatList
        data={filteredChefs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.greeting}>Good afternoon 👋</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color={colors.primary} />
                  <Text style={styles.location}>{user ? `${user.area}, ${user.city}` : 'Lagos'}</Text>
                </View>
              </View>
              <Pressable style={styles.bellButton} onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name="notifications-outline" size={20} color={colors.text} />
                {unreadCount > 0 && (
                  <View style={styles.bellBadge}>
                    <Text style={styles.bellBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textFaint} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search chefs, cuisines, areas"
                placeholderTextColor={colors.textFaint}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.quickActions}>
              <Card
                onPress={() => navigation.navigate('BookingFlow', {})}
                style={styles.quickActionCard}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                </View>
                <Text style={styles.quickActionTitle}>Book a chef</Text>
                <Text style={styles.quickActionSubtitle}>Start a new recurring plan</Text>
              </Card>
              <Card
                onPress={() => navigation.navigate('WeeklyMenu', {})}
                style={styles.quickActionCard}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: colors.accentSoft }]}>
                  <Ionicons name="restaurant-outline" size={20} color={colors.primaryDark} />
                </View>
                <Text style={styles.quickActionTitle}>Plan this week</Text>
                <Text style={styles.quickActionSubtitle}>Browse & pick dishes</Text>
              </Card>
            </View>

            <Text style={styles.sectionTitle}>Browse by cuisine</Text>
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

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {cuisine === 'All' ? 'Chefs near you' : `${cuisine} chefs near you`}
              </Text>
              <Text style={styles.resultCount}>{filteredChefs.length} found</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ChefCard
            chef={item}
            onPress={() => navigation.navigate('ChefProfile', { chefId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyStateText}>No chefs match your search yet.</Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  greeting: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginLeft: 4,
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  bellBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    color: colors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.xs,
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickActionCard: {
    flex: 1,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  quickActionSubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.lg,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  filterRow: {
    gap: spacing.xs,
    paddingBottom: spacing.lg,
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
});

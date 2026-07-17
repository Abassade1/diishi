import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Button, StarRating, Tag } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { getChefById, getDishesForChef } from '@/data';
import { formatNaira } from '@/utils/format';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ChefProfile'>;

export function ChefProfileScreen({ route, navigation }: Props) {
  const { chefId } = route.params;
  const chef = getChefById(chefId);
  const { savedChefIds, toggleSavedChef } = useAppContext();
  const isSaved = savedChefIds.includes(chefId);

  if (!chef) return null;

  const dishes = getDishesForChef(chefId);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        <View>
          <Image source={{ uri: chef.coverPhoto }} style={styles.cover} />
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Pressable style={styles.saveButton} onPress={() => toggleSavedChef(chefId)}>
            <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={20} color={isSaved ? colors.primary : colors.text} />
          </Pressable>
        </View>

        <View style={styles.profileHeader}>
          <Image source={{ uri: chef.avatar }} style={styles.avatar} />
          <View style={styles.profileHeaderBody}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{chef.name}</Text>
              {chef.verified && <Ionicons name="checkmark-circle" size={16} color={colors.primary} style={{ marginLeft: 4 }} />}
            </View>
            <Text style={styles.area}>{chef.area}, {chef.city}</Text>
            <StarRating rating={chef.rating} showValue reviewCount={chef.reviewCount} size={14} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{chef.yearsExperience}yrs</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{chef.completedBookings}</Text>
            <Text style={styles.statLabel}>Visits done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatNaira(chef.pricePerVisit)}</Text>
            <Text style={styles.statLabel}>Per visit</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.tagsRow}>
            {chef.specialties.map((s) => (
              <Tag key={s} label={s} tone="primary" size="md" style={{ marginRight: spacing.xs, marginBottom: spacing.xs }} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{chef.bio}</Text>
          <View style={styles.responseRow}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.responseText}>{chef.responseTime}</Text>
          </View>
        </View>

        {dishes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Signature dishes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dishes.map((dish) => (
                <View key={dish.id} style={styles.dishCard}>
                  <Image source={{ uri: dish.image }} style={styles.dishImage} />
                  <Text style={styles.dishName} numberOfLines={1}>{dish.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {chef.gallery.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <View style={styles.galleryRow}>
              {chef.gallery.map((photo, idx) => (
                <Image key={idx} source={{ uri: photo }} style={styles.galleryImage} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.reviewsHeaderRow}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <StarRating rating={chef.rating} showValue reviewCount={chef.reviewCount} size={13} />
          </View>
          {chef.reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.authorAvatar }} style={styles.reviewAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewAuthor}>{review.authorName}</Text>
                  <StarRating rating={review.rating} size={11} />
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              {review.visitTag && <Tag label={review.visitTag} tone="neutral" style={{ marginTop: spacing.xs }} />}
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.messageButton}
          onPress={() => {
            navigation.navigate('MainTabs', { screen: 'Messages' });
          }}
        >
          <Ionicons name="chatbubble-outline" size={20} color={colors.primary} />
        </Pressable>
        <Button
          label="Book Again"
          onPress={() => navigation.navigate('BookingFlow', { chefId })}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cover: {
    width: '100%',
    height: 220,
    backgroundColor: colors.surfaceAlt,
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    position: 'absolute',
    top: 54,
    right: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: -32,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: colors.surface,
    backgroundColor: colors.surface,
  },
  profileHeaderBody: {
    flex: 1,
    marginLeft: spacing.sm,
    marginTop: 34,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  area: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  statValue: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.lg,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bio: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    lineHeight: 22,
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  responseText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginLeft: spacing.xxs,
  },
  dishCard: {
    width: 120,
    marginRight: spacing.sm,
  },
  dishImage: {
    width: 120,
    height: 90,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.xxs,
  },
  dishName: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.xs,
    color: colors.text,
  },
  galleryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  galleryImage: {
    width: '31.5%',
    aspectRatio: 1,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
  },
  reviewsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  reviewAuthor: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  reviewDate: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
  },
  reviewComment: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  messageButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

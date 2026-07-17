import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chef } from '@/types';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { Card } from './Card';
import { Tag } from './Tag';
import { StarRating } from './StarRating';
import { formatNaira } from '@/utils/format';

interface ChefCardProps {
  chef: Chef;
  onPress?: () => void;
  layout?: 'vertical' | 'horizontal';
}

export function ChefCard({ chef, onPress, layout = 'vertical' }: ChefCardProps) {
  if (layout === 'horizontal') {
    return (
      <Card onPress={onPress} padded={false} style={styles.horizontalCard}>
        <Image source={{ uri: chef.avatar }} style={styles.horizontalAvatar} />
        <View style={styles.horizontalBody}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {chef.name}
            </Text>
            {chef.verified && (
              <Ionicons name="checkmark-circle" size={14} color={colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <StarRating rating={chef.rating} reviewCount={chef.reviewCount} showValue size={12} />
          <View style={styles.tagsRow}>
            {chef.specialties.slice(0, 2).map((s) => (
              <Tag key={s} label={s} tone="primary" style={styles.tagSpacing} />
            ))}
          </View>
        </View>
        <Text style={styles.price}>{formatNaira(chef.pricePerVisit)}</Text>
      </Card>
    );
  }

  return (
    <Card onPress={onPress} padded={false} style={styles.card}>
      <Image source={{ uri: chef.coverPhoto }} style={styles.cover} />
      <View style={styles.avatarWrap}>
        <Image source={{ uri: chef.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.body}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {chef.name}
          </Text>
          {chef.verified && (
            <Ionicons name="checkmark-circle" size={15} color={colors.primary} style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={styles.area}>
          {chef.area}, {chef.city}
        </Text>
        <StarRating rating={chef.rating} reviewCount={chef.reviewCount} showValue size={13} />
        <View style={styles.tagsRow}>
          {chef.specialties.slice(0, 3).map((s) => (
            <Tag key={s} label={s} tone="primary" style={styles.tagSpacing} />
          ))}
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.price}>
            {formatNaira(chef.pricePerVisit)}
            <Text style={styles.priceUnit}> / visit</Text>
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
  },
  cover: {
    width: '100%',
    height: 110,
    backgroundColor: colors.surfaceAlt,
  },
  avatarWrap: {
    marginTop: -28,
    marginLeft: spacing.md,
    borderWidth: 3,
    borderColor: colors.surface,
    borderRadius: radii.pill,
    width: 60,
    height: 60,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: radii.pill,
  },
  body: {
    padding: spacing.md,
    paddingTop: spacing.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
    flexShrink: 1,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  area: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
  },
  tagSpacing: {
    marginRight: spacing.xxs,
    marginBottom: spacing.xxs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  price: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.md,
    color: colors.primaryDark,
  },
  priceUnit: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  horizontalAvatar: {
    width: 52,
    height: 52,
    borderRadius: radii.pill,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  horizontalBody: {
    flex: 1,
    marginRight: spacing.xs,
  },
});

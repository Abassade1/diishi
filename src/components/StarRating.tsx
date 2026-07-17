import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, fontSizes, spacing } from '@/theme';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  editable?: boolean;
  onChange?: (value: number) => void;
}

export function StarRating({
  rating,
  size = 14,
  showValue = false,
  reviewCount,
  editable = false,
  onChange,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.row}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        const StarEl = (
          <Ionicons
            key={star}
            name={filled ? 'star' : 'star-outline'}
            size={size}
            color={colors.star}
            style={styles.star}
          />
        );
        if (editable) {
          return (
            <Pressable key={star} onPress={() => onChange?.(star)} hitSlop={8}>
              {StarEl}
            </Pressable>
          );
        }
        return StarEl;
      })}
      {showValue && (
        <Text style={styles.value}>
          {rating.toFixed(1)}
          {reviewCount !== undefined ? ` (${reviewCount})` : ''}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  value: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginLeft: spacing.xxs,
  },
});

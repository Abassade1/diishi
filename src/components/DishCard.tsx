import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dish } from '@/types';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { Tag } from './Tag';

interface DishCardProps {
  dish: Dish;
  selected?: boolean;
  onToggle?: () => void;
}

export function DishCard({ dish, selected = false, onToggle }: DishCardProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Image source={{ uri: dish.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {dish.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>
        <View style={styles.tagsRow}>
          <Tag label={dish.cuisine} tone="neutral" />
          {dish.tags.slice(0, 1).map((t) => (
            <Tag key={t} label={t} tone="accent" style={styles.tagSpacing} />
          ))}
        </View>
      </View>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Ionicons name="checkmark" size={14} color={colors.white} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  body: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagSpacing: {
    marginLeft: spacing.xxs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

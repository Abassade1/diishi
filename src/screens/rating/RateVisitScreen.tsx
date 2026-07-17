import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, StarRating } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { getBookingById, getChefById } from '@/data';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'RateVisit'>;

const QUICK_TAGS = [
  'Punctual',
  'Great flavour',
  'Clean kitchen',
  'Generous portions',
  'Creative menu',
  'Friendly',
];

export function RateVisitScreen({ route, navigation }: Props) {
  const { bookingId } = route.params;
  const booking = getBookingById(bookingId);
  const chef = booking ? getChefById(booking.chefId) : undefined;
  const { markBookingRated } = useAppContext();

  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!booking || !chef) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleSubmit = () => {
    markBookingRated(bookingId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouEmoji}>🙏🏾</Text>
          <Text style={styles.thankYouTitle}>Thanks for the feedback!</Text>
          <Text style={styles.thankYouSubtitle}>
            Your review helps other households find great chefs like {chef.name}.
          </Text>
          <Button label="Done" onPress={() => navigation.goBack()} style={{ marginTop: spacing.xl }} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScreenHeader title="Rate your visit" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chefRow}>
          <Image source={{ uri: chef.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.chefName}>{chef.name}</Text>
            <Text style={styles.serviceType}>{booking.serviceType}</Text>
          </View>
        </View>

        <Text style={styles.question}>How was your visit?</Text>
        <View style={styles.starsRow}>
          <StarRating rating={rating} editable onChange={setRating} size={38} />
        </View>

        <Text style={styles.label}>What stood out?</Text>
        <View style={styles.tagGrid}>
          {QUICK_TAGS.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <Pressable
                key={tag}
                onPress={() => toggleTag(tag)}
                style={[styles.tagChip, selected && styles.tagChipSelected]}
              >
                <Text style={[styles.tagChipLabel, selected && styles.tagChipLabelSelected]}>{tag}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Add a comment (optional)</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Tell other households what to expect..."
          placeholderTextColor={colors.textFaint}
          style={styles.commentInput}
          multiline
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Submit review" onPress={handleSubmit} disabled={rating === 0} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  chefName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  serviceType: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  question: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xl,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  starsRow: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  tagChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  tagChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagChipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  tagChipLabelSelected: {
    color: colors.white,
  },
  commentInput: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  thankYouContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  thankYouEmoji: {
    fontSize: 56,
    marginBottom: spacing.lg,
  },
  thankYouTitle: {
    fontFamily: fonts.displayBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  thankYouSubtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});

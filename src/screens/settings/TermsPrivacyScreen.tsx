import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TermsPrivacy'>;

const TERMS_SECTIONS = [
  {
    title: '1. Using Diishi',
    body: 'Diishi connects households with independent private chefs for recurring meal-prep visits. By creating an account you confirm you are at least 18 years old and able to enter a binding agreement in Nigeria.',
  },
  {
    title: '2. Bookings & payments',
    body: 'All visits are paid in advance through our payment partner, Paystack. Recurring plans are billed per visit or as a discounted multi-visit bundle, and can be cancelled at any time from the Bookings tab.',
  },
  {
    title: '3. Chef conduct',
    body: 'Chefs on Diishi are independent contractors who have completed our verification process. Diishi is not liable for the individual conduct of a chef, but we investigate every report through our support team.',
  },
  {
    title: '4. Cancellations',
    body: 'Visits cancelled more than 24 hours in advance are fully refunded. Late cancellations may incur a fee to compensate the chef for reserved time.',
  },
  {
    title: '5. Changes to these terms',
    body: 'We may update these terms from time to time. Continued use of Diishi after changes take effect constitutes acceptance of the revised terms.',
  },
];

const PRIVACY_SECTIONS = [
  {
    title: '1. Information we collect',
    body: 'We collect your name, phone number, email, delivery address and dietary preferences to match you with suitable chefs and coordinate visits.',
  },
  {
    title: '2. How we use your information',
    body: 'Your information is used to process bookings and payments, personalise chef recommendations, and send booking-related notifications you\'ve opted into.',
  },
  {
    title: '3. Sharing with chefs',
    body: 'Chefs you book can see your name, delivery address, dietary preferences and messages you send them — nothing more.',
  },
  {
    title: '4. Payment data',
    body: 'Card details are tokenised and processed directly by Paystack. Diishi never stores your full card number or CVV.',
  },
  {
    title: '5. Your choices',
    body: 'You can edit or delete your saved addresses and payment methods at any time from Settings, and control which notifications you receive.',
  },
];

export function TermsPrivacyScreen({ route, navigation }: Props) {
  const [tab, setTab] = useState<'terms' | 'privacy'>(route.params?.tab ?? 'terms');
  const sections = tab === 'terms' ? TERMS_SECTIONS : PRIVACY_SECTIONS;

  return (
    <Screen>
      <ScreenHeader title="Terms & privacy" onBack={() => navigation.goBack()} />
      <View style={styles.tabRow}>
        <Pressable
          onPress={() => setTab('terms')}
          style={[styles.tabButton, tab === 'terms' && styles.tabButtonActive]}
        >
          <Text style={[styles.tabLabel, tab === 'terms' && styles.tabLabelActive]}>Terms of Service</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('privacy')}
          style={[styles.tabButton, tab === 'privacy' && styles.tabButtonActive]}
        >
          <Text style={[styles.tabLabel, tab === 'privacy' && styles.tabLabelActive]}>Privacy Policy</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.updated}>Last updated 1 July 2026</Text>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: spacing.xl,
  },
  updated: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionBody: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 21,
  },
});

import React from 'react';
import { Share, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, Card } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ReferAFriend'>;

function buildReferralCode(fullName: string) {
  const initials = fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return `${initials || 'DSH'}2026`;
}

export function ReferAFriendScreen({ navigation }: Props) {
  const { user } = useAppContext();
  const referralCode = buildReferralCode(user?.fullName ?? 'Diishi');

  const handleShare = () => {
    Share.share({
      message: `Cook less, eat better. Join me on Diishi and get ₦5,000 off your first chef visit with my code ${referralCode}.`,
    });
  };

  return (
    <Screen>
      <ScreenHeader title="Refer a friend" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.heroIcon}>
          <Ionicons name="gift-outline" size={32} color={colors.primary} />
        </View>
        <Text style={styles.title}>Give ₦5,000, get ₦5,000</Text>
        <Text style={styles.subtitle}>
          Share your code with friends and family. When they book their first chef visit, you both
          get ₦5,000 credit toward your next booking.
        </Text>

        <Card style={styles.codeCard}>
          <Text style={styles.codeLabel}>Your referral code</Text>
          <Text style={styles.code}>{referralCode}</Text>
        </Card>

        <Button label="Share invite" icon="share-social-outline" onPress={handleShare} />

        <View style={styles.stepsCard}>
          <StepItem number={1} text="Share your code with friends via any app" />
          <StepItem number={2} text="They sign up and book their first chef visit" />
          <StepItem number={3} text="You both receive ₦5,000 credit automatically" />
        </View>
      </View>
    </Screen>
  );
}

function StepItem({ number, text }: { number: number; text: string }) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: spacing.xl,
  },
  codeCard: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  codeLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  code: {
    fontFamily: fonts.displayBold,
    fontSize: fontSizes.xxl,
    color: colors.primaryDark,
    letterSpacing: 2,
  },
  stepsCard: {
    width: '100%',
    marginTop: spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  stepNumberText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.xs,
    color: colors.white,
  },
  stepText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    lineHeight: 20,
  },
});

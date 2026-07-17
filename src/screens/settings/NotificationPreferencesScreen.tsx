import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, ToggleRow } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'NotificationPreferences'>;

export function NotificationPreferencesScreen({ navigation }: Props) {
  const { notificationPreferences, updateNotificationPreferences } = useAppContext();

  return (
    <Screen>
      <ScreenHeader title="Notification preferences" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Push notifications</Text>
        <ToggleRow
          title="Booking reminders"
          description="Get notified before an upcoming chef visit"
          value={notificationPreferences.bookingReminders}
          onValueChange={(value) => updateNotificationPreferences({ bookingReminders: value })}
        />
        <ToggleRow
          title="Chef messages"
          description="New messages from your chefs"
          value={notificationPreferences.chefMessages}
          onValueChange={(value) => updateNotificationPreferences({ chefMessages: value })}
        />
        <ToggleRow
          title="Weekly menu suggestions"
          description="Fresh dish ideas based on your preferences"
          value={notificationPreferences.weeklyMenuSuggestions}
          onValueChange={(value) => updateNotificationPreferences({ weeklyMenuSuggestions: value })}
        />
        <ToggleRow
          title="Promotions & offers"
          description="Discounts and seasonal offers from Diishi"
          value={notificationPreferences.promotions}
          onValueChange={(value) => updateNotificationPreferences({ promotions: value })}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
});

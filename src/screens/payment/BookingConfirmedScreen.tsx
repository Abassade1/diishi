import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, Button } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmed'>;

export function BookingConfirmedScreen({ navigation }: Props) {
  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark" size={44} color={colors.white} />
        </View>
        <Text style={styles.title}>Booking confirmed!</Text>
        <Text style={styles.subtitle}>
          Your chef has been notified. You'll get a message once they confirm the visit details.
        </Text>
        <View style={styles.footer}>
          <Button
            label="View my bookings"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Bookings' } }] })
            }
          />
          <Button
            label="Back to home"
            variant="ghost"
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs', params: { screen: 'Home' } }] })
            }
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xxl,
  },
  footer: {
    width: '100%',
    gap: spacing.sm,
  },
});

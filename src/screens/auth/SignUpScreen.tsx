import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, FormField } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const canContinue = fullName.trim().length > 1 && email.includes('@') && phone.trim().length >= 10;

  return (
    <Screen>
      <ScreenHeader title="Create your account" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Tell us a bit about yourself so chefs and support know who they're cooking for.
        </Text>
        <FormField label="Full name" value={fullName} onChangeText={setFullName} placeholder="e.g. Ada Bassey" />
        <FormField
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="+234 800 000 0000"
          keyboardType="phone-pad"
        />
        <Text style={styles.terms}>
          By continuing, you agree to Diishi's Terms of Service and Privacy Policy.
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label="Continue"
          disabled={!canContinue}
          onPress={() =>
            navigation.navigate('OtpVerification', {
              phone: phone.trim(),
              mode: 'signup',
              fullName: fullName.trim(),
              email: email.trim(),
            })
          }
          icon="arrow-forward"
          iconPosition="right"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  terms: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
    lineHeight: 16,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

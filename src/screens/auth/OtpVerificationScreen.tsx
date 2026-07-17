import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

const CODE_LENGTH = 4;
const RESEND_SECONDS = 30;

export function OtpVerificationScreen({ route, navigation }: Props) {
  const { phone, mode, fullName, email } = route.params;
  const { signUp, logIn, completeOnboarding } = useAppContext();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const code = digits.join('');
  const canVerify = code.length === CODE_LENGTH;

  const handleChangeDigit = (text: string, index: number) => {
    const value = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (mode === 'signup') {
      signUp({ fullName: fullName ?? '', email: email ?? '', phone });
      navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
    } else {
      logIn(phone);
      completeOnboarding();
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }
  };

  return (
    <Screen>
      <ScreenHeader title="Verify your number" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Enter the {CODE_LENGTH}-digit code we sent to {phone || 'your phone'}.
        </Text>
        <View style={styles.codeRow}>
          {digits.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChangeText={(text) => handleChangeDigit(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.codeBox, digit && styles.codeBoxFilled]}
            />
          ))}
        </View>
        <Text style={styles.demoHint}>Demo mode — enter any {CODE_LENGTH} digits to continue.</Text>

        {secondsLeft > 0 ? (
          <Text style={styles.resendText}>Resend code in 0:{secondsLeft.toString().padStart(2, '0')}</Text>
        ) : (
          <Pressable onPress={() => setSecondsLeft(RESEND_SECONDS)}>
            <Text style={styles.resendLink}>Resend code</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.footer}>
        <Button label="Verify & continue" disabled={!canVerify} onPress={handleVerify} icon="checkmark" iconPosition="right" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    flex: 1,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  codeBox: {
    width: 56,
    height: 64,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    textAlign: 'center',
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
  },
  codeBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  demoHint: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  resendText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
  resendLink: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, FormField, SocialButton } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { SocialProvider } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { socialLogin, completeOnboarding } = useAppContext();
  const [phone, setPhone] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);

  const canContinue = phone.trim().length >= 10;

  const handleSocialLogin = (provider: SocialProvider) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      socialLogin(provider);
      completeOnboarding();
      setLoadingProvider(null);
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    }, 900);
  };

  return (
    <Screen>
      <ScreenHeader title="Welcome back" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>
          Enter the phone number linked to your Diishi account. We'll text you a one-time code.
        </Text>
        <FormField
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          placeholder="+234 800 000 0000"
          keyboardType="phone-pad"
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialList}>
          <SocialButton
            kind="google"
            label="Continue with Google"
            loading={loadingProvider === 'google'}
            onPress={() => handleSocialLogin('google')}
          />
          <SocialButton
            kind="facebook"
            label="Continue with Facebook"
            loading={loadingProvider === 'facebook'}
            onPress={() => handleSocialLogin('facebook')}
          />
          <SocialButton
            kind="x"
            label="Continue with X"
            loading={loadingProvider === 'x'}
            onPress={() => handleSocialLogin('x')}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label="Send code"
          disabled={!canContinue}
          onPress={() => navigation.navigate('OtpVerification', { phone: phone.trim(), mode: 'login' })}
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
    marginHorizontal: spacing.sm,
  },
  socialList: {
    gap: spacing.sm,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

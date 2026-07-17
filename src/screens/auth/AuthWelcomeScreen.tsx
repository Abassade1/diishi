import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, Button, SocialButton } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';
import { chefCovers } from '@/data/images';
import { useAppContext } from '@/context/AppContext';
import { SocialProvider } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthWelcome'>;

export function AuthWelcomeScreen({ navigation }: Props) {
  const { socialLogin } = useAppContext();
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);

  const handleSocialLogin = (provider: SocialProvider) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      socialLogin(provider);
      setLoadingProvider(null);
      navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
    }, 900);
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: chefCovers.cover1 }} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.kicker}>Welcome to Diishi</Text>
          <Text style={styles.title}>Home-cooked meals, without the home cooking</Text>
          <Text style={styles.subtitle}>
            Connect with vetted private chefs for recurring meal prep across Lagos and Abuja.
          </Text>
        </View>
        <View style={styles.footer}>
          <Button label="Get started" onPress={() => navigation.navigate('SignUp')} icon="arrow-forward" iconPosition="right" />

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

          <Pressable style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkTextStrong}>Log in</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 280,
  },
  body: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  kicker: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: fontSizes.xxxl,
    color: colors.text,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.md,
    color: colors.textMuted,
    lineHeight: 22,
  },
  footer: {
    padding: spacing.xl,
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
  loginLink: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  loginLinkText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  loginLinkTextStrong: {
    fontFamily: fonts.bodySemiBold,
    color: colors.primary,
  },
});

import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, FormField } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export function EditProfileScreen({ navigation }: Props) {
  const { user, updateUser } = useAppContext();

  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [area, setArea] = useState(user?.area ?? '');

  const canSave = fullName.trim().length > 1 && email.includes('@') && phone.trim().length >= 10;

  const handleSave = () => {
    updateUser({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), area: area.trim() });
    navigation.goBack();
  };

  if (!user) return null;

  return (
    <Screen>
      <ScreenHeader title="Edit profile" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Pressable style={styles.changePhotoButton}>
            <Ionicons name="camera-outline" size={16} color={colors.primary} />
            <Text style={styles.changePhotoText}>Change photo</Text>
          </Pressable>
        </View>

        <FormField label="Full name" value={fullName} onChangeText={setFullName} placeholder="Full name" />
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
        <FormField label="Area" value={area} onChangeText={setArea} placeholder="e.g. Lekki Phase 1" />
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Save changes" disabled={!canSave} onPress={handleSave} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.sm,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  changePhotoText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.xs,
    color: colors.primaryDark,
    marginLeft: 4,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

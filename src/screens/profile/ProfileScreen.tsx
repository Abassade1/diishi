import React, { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/types';
import { Screen, Card, ChefCard, ConfirmModal } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { chefs } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { TAB_BAR_BASE_HEIGHT } from '@/navigation/tabBarMetrics';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SETTINGS_ITEMS: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: keyof RootStackParamList;
}[] = [
  { icon: 'card-outline', label: 'Payment methods', route: 'PaymentMethods' },
  { icon: 'location-outline', label: 'Delivery addresses', route: 'Addresses' },
  { icon: 'notifications-outline', label: 'Notification preferences', route: 'NotificationPreferences' },
  { icon: 'gift-outline', label: 'Refer a friend', route: 'ReferAFriend' },
  { icon: 'help-circle-outline', label: 'Help & support', route: 'HelpSupport' },
  { icon: 'document-text-outline', label: 'Terms & privacy', route: 'TermsPrivacy' },
];

export function ProfileScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { user, preferences, savedChefIds, logOut } = useAppContext();
  const savedChefs = chefs.filter((c) => savedChefIds.includes(c.id));
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);

  const confirmLogOut = () => {
    setLogOutModalVisible(false);
    logOut();
    navigation.reset({ index: 0, routes: [{ name: 'AuthWelcome' }] });
  };

  if (!user) return null;

  return (
    <Screen edges={['top']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: TAB_BAR_BASE_HEIGHT + insets.bottom + spacing.lg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{user.fullName}</Text>
            <Text style={styles.userLocation}>{user.area}, {user.city}</Text>
          </View>
          <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
            <Ionicons name="create-outline" size={18} color={colors.primary} />
          </Pressable>
        </View>

        <Card style={styles.prefsCard}>
          <View style={styles.prefsHeaderRow}>
            <Text style={styles.sectionTitle}>Household preferences</Text>
            <Pressable onPress={() => navigation.navigate('EditPreferences')}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
          <PrefRow
            icon="people-outline"
            label="Household size"
            value={preferences.householdSize ? `${preferences.householdSize} people` : 'Not set'}
          />
          <PrefRow
            icon="leaf-outline"
            label="Dietary preferences"
            value={preferences.dietaryPreferences.length > 0 ? preferences.dietaryPreferences.join(', ') : 'Not set'}
          />
          <PrefRow
            icon="repeat-outline"
            label="Cooking cadence"
            value={preferences.cookingCadence ?? 'Not set'}
          />
        </Card>

        {savedChefs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Saved chefs</Text>
            <FlatList
              data={savedChefs}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.savedChefCard}>
                  <ChefCard chef={item} onPress={() => navigation.navigate('ChefProfile', { chefId: item.id })} />
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Card padded={false}>
            {SETTINGS_ITEMS.map((item, idx) => (
              <Pressable
                key={item.label}
                onPress={() => navigation.navigate(item.route as any)}
                style={[styles.settingsRow, idx === SETTINGS_ITEMS.length - 1 && styles.settingsRowLast]}
              >
                <Ionicons name={item.icon} size={20} color={colors.textMuted} />
                <Text style={styles.settingsLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
              </Pressable>
            ))}
          </Card>
        </View>

        <Pressable style={styles.logoutButton} onPress={() => setLogOutModalVisible(true)}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <Text style={styles.versionText}>Diishi v1.0.0 (prototype)</Text>
      </ScrollView>
      <ConfirmModal
        visible={logOutModalVisible}
        title="Log out"
        message="Are you sure you want to log out of Diishi?"
        confirmLabel="Log out"
        onConfirm={confirmLogOut}
        onCancel={() => setLogOutModalVisible(false)}
      />
    </Screen>
  );
}

function PrefRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.prefRow}>
      <View style={styles.prefIconWrap}>
        <Ionicons name={icon} size={16} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.prefLabel}>{label}</Text>
        <Text style={styles.prefValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: spacing.md,
    backgroundColor: colors.surfaceAlt,
  },
  userName: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xl,
    color: colors.text,
  },
  userLocation: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefsCard: {
    marginBottom: spacing.xl,
  },
  prefsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  editLink: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  sectionTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  prefIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  prefLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  prefValue: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
    marginTop: 1,
  },
  section: {
    marginBottom: spacing.xl,
  },
  savedChefCard: {
    width: 220,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsRowLast: {
    borderBottomWidth: 0,
  },
  settingsLabel: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.base,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  logoutText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.danger,
    marginLeft: spacing.xs,
  },
  versionText: {
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
    marginTop: spacing.sm,
  },
});

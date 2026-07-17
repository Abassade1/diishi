import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { AppNotification, AppNotificationType } from '@/types';
import { formatMessageTime } from '@/utils/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

const typeIcon: Record<AppNotificationType, keyof typeof Ionicons.glyphMap> = {
  booking: 'calendar-outline',
  message: 'chatbubble-ellipses-outline',
  promo: 'pricetag-outline',
  system: 'checkmark-circle-outline',
};

export function NotificationsScreen({ navigation }: Props) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppContext();

  const handlePress = (notification: AppNotification) => {
    markNotificationRead(notification.id);
    if (notification.type === 'booking') {
      navigation.navigate('MainTabs', { screen: 'Bookings' });
    } else if (notification.type === 'message') {
      navigation.navigate('MainTabs', { screen: 'Messages' });
    }
  };

  return (
    <Screen>
      <ScreenHeader
        title="Notifications"
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={markAllNotificationsRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </Pressable>
        }
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)} style={[styles.card, !item.read && styles.cardUnread]}>
            <View style={styles.iconWrap}>
              <Ionicons name={typeIcon[item.type]} size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body} numberOfLines={2}>
                {item.body}
              </Text>
              <Text style={styles.time}>{formatMessageTime(item.timestamp)}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyStateText}>You're all caught up.</Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  markAllText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  cardUnread: {
    backgroundColor: colors.primarySoft,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  title: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    marginBottom: 2,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: 4,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.xs,
    marginTop: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyStateText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.textFaint,
    marginTop: spacing.sm,
  },
});

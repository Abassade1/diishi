import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, Card } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { chatThreads, getChefById } from '@/data';
import { Ionicons } from '@expo/vector-icons';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MessagesScreen() {
  const navigation = useNavigation<Nav>();
  const sortedThreads = [...chatThreads].sort((a, b) => b.unread - a.unread);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={sortedThreads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => {
          const chef = getChefById(item.chefId);
          if (!chef) return null;
          return (
            <Card
              onPress={() => navigation.navigate('ChatThread', { threadId: item.id })}
              style={styles.threadCard}
            >
              <Image source={{ uri: chef.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.chefName}>{chef.name}</Text>
                  <Text style={styles.time}>{item.lastMessageTime}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text
                    style={[styles.lastMessage, item.unread > 0 && styles.lastMessageUnread]}
                    numberOfLines={1}
                  >
                    {item.lastMessage}
                  </Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </Card>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyStateText}>No conversations yet.</Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.xxl,
    color: colors.text,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  threadCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chefName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
    flexShrink: 1,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
  },
  lastMessage: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    flex: 1,
    marginRight: spacing.xs,
    marginTop: 2,
  },
  lastMessageUnread: {
    color: colors.text,
    fontFamily: fonts.bodyMedium,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: colors.white,
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

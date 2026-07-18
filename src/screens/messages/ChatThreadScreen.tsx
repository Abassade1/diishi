import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/types';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { getChefById, getThreadById } from '@/data';
import { formatMessageTime } from '@/utils/format';
import { ChatMessage } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatThread'>;

export function ChatThreadScreen({ route, navigation }: Props) {
  const { threadId } = route.params;
  const thread = getThreadById(threadId);
  const chef = thread ? getChefById(thread.chefId) : undefined;
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>(thread?.messages ?? []);
  const [draft, setDraft] = useState('');

  if (!thread || !chef) return null;

  const handleSend = () => {
    if (!draft.trim()) return;
    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      threadId,
      senderId: 'me',
      text: draft.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setDraft('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Image source={{ uri: chef.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.chefName}>{chef.name}</Text>
          <Text style={styles.responseTime}>{chef.responseTime}</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('ChefProfile', { chefId: chef.id })}
          style={styles.profileButton}
        >
          <Ionicons name="person-circle-outline" size={24} color={colors.primary} />
        </Pressable>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => {
          const isMe = item.senderId === 'me';
          return (
            <View style={[styles.bubbleRow, isMe ? styles.bubbleRowMe : styles.bubbleRowThem]}>
              <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{item.text}</Text>
              </View>
              <Text style={styles.timestamp}>{formatMessageTime(item.timestamp)}</Text>
            </View>
          );
        }}
      />

      <View style={[styles.inputBar, { paddingBottom: spacing.md + insets.bottom }]}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message..."
          placeholderTextColor={colors.textFaint}
          style={styles.input}
          multiline
        />
        <Pressable onPress={handleSend} style={styles.sendButton} disabled={!draft.trim()}>
          <Ionicons name="send" size={18} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 54,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  chefName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  responseTime: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
  profileButton: {
    padding: spacing.xxs,
  },
  messageList: {
    padding: spacing.lg,
  },
  bubbleRow: {
    marginBottom: spacing.md,
    maxWidth: '80%',
  },
  bubbleRowMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleRowThem: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubbleThem: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text,
    lineHeight: 20,
  },
  bubbleTextMe: {
    color: colors.white,
  },
  timestamp: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textFaint,
    marginTop: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.text,
    maxHeight: 100,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

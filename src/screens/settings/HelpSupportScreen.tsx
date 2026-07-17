import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Card } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { faqCategories, faqs } from '@/data/faqs';

type Props = NativeStackScreenProps<RootStackParamList, 'HelpSupport'>;

export function HelpSupportScreen({ navigation }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Screen>
      <ScreenHeader title="Help & support" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.contactRow}>
          <Pressable style={styles.contactCard} onPress={() => Linking.openURL('tel:+2349000000000')}>
            <Ionicons name="call-outline" size={20} color={colors.primary} />
            <Text style={styles.contactLabel}>Call us</Text>
          </Pressable>
          <Pressable
            style={styles.contactCard}
            onPress={() => Linking.openURL('mailto:support@diishi.app')}
          >
            <Ionicons name="mail-outline" size={20} color={colors.primary} />
            <Text style={styles.contactLabel}>Email us</Text>
          </Pressable>
          <Pressable style={styles.contactCard} onPress={() => navigation.navigate('MainTabs', { screen: 'Messages' })}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
            <Text style={styles.contactLabel}>Live chat</Text>
          </Pressable>
        </View>

        {faqCategories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {faqs
              .filter((faq) => faq.category === category)
              .map((faq) => {
                const expanded = expandedId === faq.id;
                return (
                  <Card key={faq.id} padded={false} style={styles.faqCard}>
                    <Pressable
                      style={styles.faqHeader}
                      onPress={() => setExpandedId(expanded ? null : faq.id)}
                    >
                      <Text style={styles.faqQuestion}>{faq.question}</Text>
                      <Ionicons
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.textMuted}
                      />
                    </Pressable>
                    {expanded && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
                  </Card>
                );
              })}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  contactRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  contactCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.xs,
    color: colors.text,
    marginTop: spacing.xs,
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryTitle: {
    fontFamily: fonts.displaySemiBold,
    fontSize: fontSizes.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  faqCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
    marginRight: spacing.sm,
  },
  faqAnswer: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 19,
  },
});

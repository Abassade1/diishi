import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, Card, Tag } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { PaymentMethod } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentMethods'>;

const brandIcon: Record<PaymentMethod['brand'], keyof typeof Ionicons.glyphMap> = {
  Visa: 'card-outline',
  Mastercard: 'card-outline',
  Verve: 'card-outline',
};

export function PaymentMethodsScreen({ navigation }: Props) {
  const { paymentMethods, setDefaultPaymentMethod, removePaymentMethod } = useAppContext();

  return (
    <Screen>
      <ScreenHeader title="Payment methods" onBack={() => navigation.goBack()} />
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.iconWrap}>
                <Ionicons name={brandIcon[item.brand]} size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.brand}>{item.brand} •••• {item.last4}</Text>
                  {item.isDefault && <Tag label="Default" tone="primary" style={{ marginLeft: spacing.xs }} />}
                </View>
                <Text style={styles.expiry}>Expires {item.expiry}</Text>
              </View>
            </View>
            <View style={styles.actionsRow}>
              {!item.isDefault && (
                <Pressable onPress={() => setDefaultPaymentMethod(item.id)} style={styles.actionButton}>
                  <Text style={styles.actionText}>Set as default</Text>
                </Pressable>
              )}
              <Pressable onPress={() => removePaymentMethod(item.id)} style={styles.actionButton}>
                <Ionicons name="trash-outline" size={16} color={colors.danger} />
                <Text style={[styles.actionText, { color: colors.danger, marginLeft: 4 }]}>Remove</Text>
              </Pressable>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="card-outline" size={32} color={colors.textFaint} />
            <Text style={styles.emptyStateText}>No saved payment methods yet.</Text>
          </View>
        }
      />
      <View style={styles.footer}>
        <Button
          label="Add new card"
          variant="outline"
          icon="add"
          onPress={() => navigation.navigate('AddPaymentMethod')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {},
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.base,
    color: colors.text,
  },
  expiry: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
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
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

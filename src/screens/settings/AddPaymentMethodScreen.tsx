import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, FormField } from '@/components';
import { colors, fonts, fontSizes, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { CardBrand } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddPaymentMethod'>;

function detectBrand(cardNumber: string): CardBrand {
  if (cardNumber.startsWith('4')) return 'Visa';
  if (cardNumber.startsWith('5')) return 'Mastercard';
  return 'Verve';
}

export function AddPaymentMethodScreen({ navigation }: Props) {
  const { addPaymentMethod } = useAppContext();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const digitsOnly = cardNumber.replace(/\D/g, '');
  const canSave = name.trim().length > 1 && digitsOnly.length >= 12 && /^\d{2}\/\d{2}$/.test(expiry) && cvv.length >= 3;

  const handleSave = () => {
    addPaymentMethod({
      brand: detectBrand(digitsOnly),
      last4: digitsOnly.slice(-4),
      expiry,
    });
    navigation.goBack();
  };

  return (
    <Screen>
      <ScreenHeader title="Add a card" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <FormField label="Name on card" value={name} onChangeText={setName} placeholder="e.g. Ada Bassey" />
        <FormField
          label="Card number"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="0000 0000 0000 0000"
          keyboardType="number-pad"
        />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <FormField label="Expiry (MM/YY)" value={expiry} onChangeText={setExpiry} placeholder="09/28" keyboardType="number-pad" />
          </View>
          <View style={{ flex: 1 }}>
            <FormField label="CVV" value={cvv} onChangeText={setCvv} placeholder="123" keyboardType="number-pad" />
          </View>
        </View>
        <View style={styles.secureBadge}>
          <Ionicons name="lock-closed-outline" size={14} color={colors.textMuted} />
          <Text style={styles.secureText}>Card details are tokenised securely via Paystack</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Save card" disabled={!canSave} onPress={handleSave} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  secureText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginLeft: spacing.xxs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

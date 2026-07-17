import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Screen, ScreenHeader, Button, FormField } from '@/components';
import { colors, fonts, fontSizes, radii, spacing } from '@/theme';
import { useAppContext } from '@/context/AppContext';
import { AddressLabel } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddAddress'>;

const LABELS: AddressLabel[] = ['Home', 'Work', 'Other'];
const CITIES: ('Lagos' | 'Abuja')[] = ['Lagos', 'Abuja'];

export function AddAddressScreen({ navigation }: Props) {
  const { addAddress } = useAppContext();
  const [label, setLabel] = useState<AddressLabel>('Home');
  const [line, setLine] = useState('');
  const [city, setCity] = useState<'Lagos' | 'Abuja'>('Lagos');

  const canSave = line.trim().length > 5;

  const handleSave = () => {
    addAddress({ label, line: line.trim(), city });
    navigation.goBack();
  };

  return (
    <Screen>
      <ScreenHeader title="Add an address" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Label</Text>
        <View style={styles.chipRow}>
          {LABELS.map((opt) => {
            const selected = label === opt;
            return (
              <Pressable key={opt} onPress={() => setLabel(opt)} style={[styles.chip, selected && styles.chipSelected]}>
                <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>

        <FormField
          label="Address"
          value={line}
          onChangeText={setLine}
          placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
        />

        <Text style={styles.label}>City</Text>
        <View style={styles.chipRow}>
          {CITIES.map((opt) => {
            const selected = city === opt;
            return (
              <Pressable key={opt} onPress={() => setCity(opt)} style={[styles.chip, selected && styles.chipSelected]}>
                <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Save address" disabled={!canSave} onPress={handleSave} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  chipLabelSelected: {
    color: colors.white,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

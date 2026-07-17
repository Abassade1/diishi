import React from 'react';
import { FlatList, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingFlowParamList } from '@/navigation/types';
import { Screen, ScreenHeader, StepProgress, ChefCard, Button } from '@/components';
import { colors, spacing } from '@/theme';
import { chefs } from '@/data';
import { useAppContext } from '@/context/AppContext';
import { StyleSheet } from 'react-native';

type Props = NativeStackScreenProps<BookingFlowParamList, 'SelectChef'>;

const STEPS = ['Service', 'Chef', 'Menu', 'Schedule', 'Confirm'];

export function SelectChefScreen({ navigation }: Props) {
  const { bookingDraft, updateBookingDraft } = useAppContext();

  return (
    <Screen>
      <ScreenHeader title="Choose your chef" onBack={() => navigation.goBack()} />
      <View style={styles.progressWrap}>
        <StepProgress steps={STEPS} currentStep={1} />
      </View>
      <FlatList
        data={chefs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChefCard
            chef={item}
            onPress={() => updateBookingDraft({ chefId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={() => navigation.navigate('SelectMenu')}
          disabled={!bookingDraft.chefId}
          icon="arrow-forward"
          iconPosition="right"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progressWrap: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});

import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '@/theme';

interface ScreenProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
}

export function Screen({ children, style, edges = ['top', 'bottom'] }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.safe, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

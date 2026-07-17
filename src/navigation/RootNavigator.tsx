import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import { BookingFlowNavigator } from './BookingFlowNavigator';
import { OnboardingScreen } from '@/screens/onboarding/OnboardingScreen';
import { ChefProfileScreen } from '@/screens/chef/ChefProfileScreen';
import { WeeklyMenuScreen } from '@/screens/home/WeeklyMenuScreen';
import { PaymentScreen } from '@/screens/payment/PaymentScreen';
import { BookingConfirmedScreen } from '@/screens/payment/BookingConfirmedScreen';
import { RateVisitScreen } from '@/screens/rating/RateVisitScreen';
import { ChatThreadScreen } from '@/screens/messages/ChatThreadScreen';
import { useAppContext } from '@/context/AppContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { onboardingComplete } = useAppContext();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={onboardingComplete ? 'MainTabs' : 'Onboarding'}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen
        name="ChefProfile"
        component={ChefProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="WeeklyMenu"
        component={WeeklyMenuScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BookingFlow"
        component={BookingFlowNavigator}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BookingConfirmed"
        component={BookingConfirmedScreen}
        options={{ animation: 'fade', gestureEnabled: false }}
      />
      <Stack.Screen
        name="RateVisit"
        component={RateVisitScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="ChatThread"
        component={ChatThreadScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}

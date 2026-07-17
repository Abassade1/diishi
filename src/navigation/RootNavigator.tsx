import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { MainTabNavigator } from './MainTabNavigator';
import { BookingFlowNavigator } from './BookingFlowNavigator';
import { AuthWelcomeScreen } from '@/screens/auth/AuthWelcomeScreen';
import { SignUpScreen } from '@/screens/auth/SignUpScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { OtpVerificationScreen } from '@/screens/auth/OtpVerificationScreen';
import { OnboardingScreen } from '@/screens/onboarding/OnboardingScreen';
import { ChefProfileScreen } from '@/screens/chef/ChefProfileScreen';
import { WeeklyMenuScreen } from '@/screens/home/WeeklyMenuScreen';
import { PaymentScreen } from '@/screens/payment/PaymentScreen';
import { BookingConfirmedScreen } from '@/screens/payment/BookingConfirmedScreen';
import { RateVisitScreen } from '@/screens/rating/RateVisitScreen';
import { ChatThreadScreen } from '@/screens/messages/ChatThreadScreen';
import { EditProfileScreen } from '@/screens/profile/EditProfileScreen';
import { EditPreferencesScreen } from '@/screens/profile/EditPreferencesScreen';
import { PaymentMethodsScreen } from '@/screens/settings/PaymentMethodsScreen';
import { AddPaymentMethodScreen } from '@/screens/settings/AddPaymentMethodScreen';
import { AddressesScreen } from '@/screens/settings/AddressesScreen';
import { AddAddressScreen } from '@/screens/settings/AddAddressScreen';
import { NotificationPreferencesScreen } from '@/screens/settings/NotificationPreferencesScreen';
import { NotificationsScreen } from '@/screens/settings/NotificationsScreen';
import { ReferAFriendScreen } from '@/screens/settings/ReferAFriendScreen';
import { HelpSupportScreen } from '@/screens/settings/HelpSupportScreen';
import { TermsPrivacyScreen } from '@/screens/settings/TermsPrivacyScreen';
import { useAppContext } from '@/context/AppContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated, onboardingComplete } = useAppContext();

  const initialRouteName = !isAuthenticated ? 'AuthWelcome' : !onboardingComplete ? 'Onboarding' : 'MainTabs';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="AuthWelcome" component={AuthWelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
        options={{ animation: 'slide_from_right' }}
      />
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
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="EditPreferences"
        component={EditPreferencesScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="AddPaymentMethod"
        component={AddPaymentMethodScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen name="Addresses" component={AddressesScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} options={{ animation: 'slide_from_right' }} />
      <Stack.Screen
        name="NotificationPreferences"
        component={NotificationPreferencesScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ReferAFriend"
        component={ReferAFriendScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TermsPrivacy"
        component={TermsPrivacyScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}

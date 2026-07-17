import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type BookingFlowParamList = {
  SelectService: undefined;
  SelectChef: undefined;
  SelectMenu: undefined;
  SelectSchedule: undefined;
  ConfirmBooking: undefined;
};

export type RootStackParamList = {
  AuthWelcome: undefined;
  SignUp: undefined;
  Login: undefined;
  OtpVerification: { phone: string; mode: 'signup' | 'login'; fullName?: string; email?: string };
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ChefProfile: { chefId: string };
  WeeklyMenu: { chefId?: string };
  BookingFlow: { chefId?: string } | undefined;
  Payment: undefined;
  BookingConfirmed: undefined;
  RateVisit: { bookingId: string };
  ChatThread: { threadId: string };
  EditProfile: undefined;
  EditPreferences: undefined;
  PaymentMethods: undefined;
  AddPaymentMethod: undefined;
  Addresses: undefined;
  AddAddress: undefined;
  NotificationPreferences: undefined;
  Notifications: undefined;
  ReferAFriend: undefined;
  HelpSupport: undefined;
  TermsPrivacy: { tab?: 'terms' | 'privacy' } | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ChefProfile: { chefId: string };
  WeeklyMenu: { chefId?: string };
  BookingFlow: { chefId?: string } | undefined;
  Payment: undefined;
  BookingConfirmed: undefined;
  RateVisit: { bookingId: string };
  ChatThread: { threadId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

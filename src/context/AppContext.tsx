import React, { createContext, useContext, useMemo, useState, PropsWithChildren } from 'react';
import {
  Address,
  AppNotification,
  Booking,
  NotificationPreferences,
  OnboardingPreferences,
  PaymentMethod,
  SocialProvider,
  User,
} from '@/types';
import {
  bookings as initialBookings,
  defaultNotificationPreferences,
  mockAddresses,
  mockNotifications,
  mockPaymentMethods,
  mockUser,
} from '@/data';

export interface BookingDraft {
  serviceType: string | null;
  chefId: string | null;
  dishIds: string[];
  date: string | null;
  time: string | null;
  recurring: boolean;
  frequency: Booking['frequency'] | null;
  guestCount: number;
  address: string;
}

const socialProviderEmails: Record<SocialProvider, string> = {
  google: 'ada.bassey@gmail.com',
  facebook: 'ada.bassey@facebook.com',
  x: 'ada.bassey@x.com',
};

const emptyDraft: BookingDraft = {
  serviceType: null,
  chefId: null,
  dishIds: [],
  date: null,
  time: null,
  recurring: true,
  frequency: 'Weekly',
  guestCount: 2,
  address: '',
};

interface AppContextValue {
  onboardingComplete: boolean;
  preferences: OnboardingPreferences;
  setPreferences: (prefs: Partial<OnboardingPreferences>) => void;
  completeOnboarding: () => void;

  isAuthenticated: boolean;
  user: User | null;
  signUp: (details: { fullName: string; email: string; phone: string }) => void;
  logIn: (phone: string) => void;
  socialLogin: (provider: SocialProvider) => void;
  logOut: () => void;
  updateUser: (patch: Partial<User>) => void;

  savedChefIds: string[];
  toggleSavedChef: (chefId: string) => void;

  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  markBookingRated: (bookingId: string) => void;

  bookingDraft: BookingDraft;
  updateBookingDraft: (patch: Partial<BookingDraft>) => void;
  resetBookingDraft: () => void;

  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'isDefault'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;

  addresses: Address[];
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  notificationPreferences: NotificationPreferences;
  updateNotificationPreferences: (patch: Partial<NotificationPreferences>) => void;

  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [preferences, setPreferencesState] = useState<OnboardingPreferences>({
    householdSize: null,
    dietaryPreferences: [],
    cookingCadence: null,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [savedChefIds, setSavedChefIds] = useState<string[]>(['chef-1', 'chef-5']);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(emptyDraft);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences
  );
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  const setPreferences = (prefs: Partial<OnboardingPreferences>) =>
    setPreferencesState((prev) => ({ ...prev, ...prefs }));

  const completeOnboarding = () => setOnboardingComplete(true);

  const signUp: AppContextValue['signUp'] = ({ fullName, email, phone }) => {
    setUser({ ...mockUser, fullName, email, phone });
    setIsAuthenticated(true);
  };

  const logIn: AppContextValue['logIn'] = (phone) => {
    setUser((prev) => prev ?? { ...mockUser, phone });
    setIsAuthenticated(true);
  };

  const socialLogin: AppContextValue['socialLogin'] = (provider) => {
    setUser({ ...mockUser, email: socialProviderEmails[provider] });
    setIsAuthenticated(true);
  };

  const logOut = () => setIsAuthenticated(false);

  const updateUser = (patch: Partial<User>) =>
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));

  const toggleSavedChef = (chefId: string) =>
    setSavedChefIds((prev) =>
      prev.includes(chefId) ? prev.filter((id) => id !== chefId) : [...prev, chefId]
    );

  const addBooking = (booking: Booking) => setBookings((prev) => [booking, ...prev]);

  const markBookingRated = (bookingId: string) =>
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, rated: true } : b))
    );

  const updateBookingDraft = (patch: Partial<BookingDraft>) =>
    setBookingDraft((prev) => ({ ...prev, ...patch }));

  const resetBookingDraft = () => setBookingDraft(emptyDraft);

  const addPaymentMethod: AppContextValue['addPaymentMethod'] = (method) =>
    setPaymentMethods((prev) => [
      ...prev,
      { ...method, id: `pm-${Date.now()}`, isDefault: prev.length === 0 },
    ]);

  const removePaymentMethod = (id: string) =>
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id));

  const setDefaultPaymentMethod = (id: string) =>
    setPaymentMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));

  const addAddress: AppContextValue['addAddress'] = (address) =>
    setAddresses((prev) => [
      ...prev,
      { ...address, id: `addr-${Date.now()}`, isDefault: prev.length === 0 },
    ]);

  const removeAddress = (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const setDefaultAddress = (id: string) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const updateNotificationPreferences = (patch: Partial<NotificationPreferences>) =>
    setNotificationPreferences((prev) => ({ ...prev, ...patch }));

  const markNotificationRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllNotificationsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const value = useMemo<AppContextValue>(
    () => ({
      onboardingComplete,
      preferences,
      setPreferences,
      completeOnboarding,
      isAuthenticated,
      user,
      signUp,
      logIn,
      socialLogin,
      logOut,
      updateUser,
      savedChefIds,
      toggleSavedChef,
      bookings,
      addBooking,
      markBookingRated,
      bookingDraft,
      updateBookingDraft,
      resetBookingDraft,
      paymentMethods,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod,
      addresses,
      addAddress,
      removeAddress,
      setDefaultAddress,
      notificationPreferences,
      updateNotificationPreferences,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
    }),
    [
      onboardingComplete,
      preferences,
      isAuthenticated,
      user,
      savedChefIds,
      bookings,
      bookingDraft,
      paymentMethods,
      addresses,
      notificationPreferences,
      notifications,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

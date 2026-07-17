import React, { createContext, useContext, useMemo, useState, PropsWithChildren } from 'react';
import { Booking, OnboardingPreferences } from '@/types';
import { bookings as initialBookings } from '@/data';

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

  savedChefIds: string[];
  toggleSavedChef: (chefId: string) => void;

  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  markBookingRated: (bookingId: string) => void;

  bookingDraft: BookingDraft;
  updateBookingDraft: (patch: Partial<BookingDraft>) => void;
  resetBookingDraft: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [preferences, setPreferencesState] = useState<OnboardingPreferences>({
    householdSize: null,
    dietaryPreferences: [],
    cookingCadence: null,
  });
  const [savedChefIds, setSavedChefIds] = useState<string[]>(['chef-1', 'chef-5']);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(emptyDraft);

  const setPreferences = (prefs: Partial<OnboardingPreferences>) =>
    setPreferencesState((prev) => ({ ...prev, ...prefs }));

  const completeOnboarding = () => setOnboardingComplete(true);

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

  const value = useMemo<AppContextValue>(
    () => ({
      onboardingComplete,
      preferences,
      setPreferences,
      completeOnboarding,
      savedChefIds,
      toggleSavedChef,
      bookings,
      addBooking,
      markBookingRated,
      bookingDraft,
      updateBookingDraft,
      resetBookingDraft,
    }),
    [onboardingComplete, preferences, savedChefIds, bookings, bookingDraft]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

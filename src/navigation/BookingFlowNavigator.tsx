import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BookingFlowParamList, RootStackParamList } from './types';
import { SelectServiceScreen } from '@/screens/booking/SelectServiceScreen';
import { SelectChefScreen } from '@/screens/booking/SelectChefScreen';
import { SelectMenuScreen } from '@/screens/booking/SelectMenuScreen';
import { SelectScheduleScreen } from '@/screens/booking/SelectScheduleScreen';
import { ConfirmBookingScreen } from '@/screens/booking/ConfirmBookingScreen';
import { useAppContext } from '@/context/AppContext';

const Stack = createNativeStackNavigator<BookingFlowParamList>();

export function BookingFlowNavigator() {
  const route = useRoute<RouteProp<RootStackParamList, 'BookingFlow'>>();
  const { updateBookingDraft, resetBookingDraft } = useAppContext();

  useEffect(() => {
    resetBookingDraft();
    if (route.params?.chefId) {
      updateBookingDraft({ chefId: route.params.chefId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SelectService" component={SelectServiceScreen} />
      <Stack.Screen name="SelectChef" component={SelectChefScreen} />
      <Stack.Screen name="SelectMenu" component={SelectMenuScreen} />
      <Stack.Screen name="SelectSchedule" component={SelectScheduleScreen} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from './types';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { BookingsScreen } from '@/screens/booking/BookingsScreen';
import { MessagesScreen } from '@/screens/messages/MessagesScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';
import { colors, fonts, fontSizes } from '@/theme';
import { TAB_BAR_BASE_HEIGHT } from './tabBarMetrics';

const Tab = createBottomTabNavigator<MainTabParamList>();

const iconMap: Record<keyof MainTabParamList, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Bookings: { active: 'calendar', inactive: 'calendar-outline' },
  Messages: { active: 'chatbubble-ellipses', inactive: 'chatbubble-ellipses-outline' },
  Profile: { active: 'person-circle', inactive: 'person-circle-outline' },
};

export function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: TAB_BAR_BASE_HEIGHT + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.bodySemiBold,
          fontSize: fontSizes.xs,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = iconMap[route.name as keyof MainTabParamList];
          return (
            <Ionicons name={focused ? icons.active : icons.inactive} size={size - 2} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

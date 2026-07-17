import { AppNotification, NotificationPreferences } from '@/types';

export const defaultNotificationPreferences: NotificationPreferences = {
  bookingReminders: true,
  chefMessages: true,
  promotions: false,
  weeklyMenuSuggestions: true,
};

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'Upcoming visit tomorrow',
    body: 'Chef Adaeze Nwosu arrives Sunday at 10:00 AM for your weekly meal prep.',
    timestamp: '2026-07-16T08:00:00',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New message from Chef Bolaji Adekunle',
    body: 'I’ll bring the grill and extra charcoal for 8 guests.',
    timestamp: '2026-07-15T18:21:00',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'system',
    title: 'Payment successful',
    body: 'Your payment of ₦18,000 to Chef Adaeze Nwosu was successful.',
    timestamp: '2026-07-12T10:05:00',
    read: true,
  },
  {
    id: 'notif-4',
    type: 'promo',
    title: 'Save 10% on monthly plans',
    body: 'Switch to a 4-visit monthly subscription with any chef and save 10% this month.',
    timestamp: '2026-07-10T09:00:00',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'booking',
    title: 'Rate your recent visit',
    body: 'How was your meal prep with Chef Emeka Obi? Leave a review to help other households.',
    timestamp: '2026-07-09T13:00:00',
    read: true,
  },
];

export const getUnreadNotificationCount = (notifications: AppNotification[]): number =>
  notifications.filter((n) => !n.read).length;

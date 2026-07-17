import { Ionicons } from '@expo/vector-icons';

export interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  suggestedFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
}

export const serviceOptions: ServiceOption[] = [
  {
    id: 'weekly-meal-prep',
    title: 'Weekly Meal Prep',
    description: 'A chef batch-cooks a week of meals in one visit, portioned and labeled.',
    icon: 'restaurant-outline',
    suggestedFrequency: 'Weekly',
  },
  {
    id: 'grill-night',
    title: 'Grill Night',
    description: 'A live grill session for family gatherings or weekend hangouts.',
    icon: 'flame-outline',
    suggestedFrequency: 'Bi-weekly',
  },
  {
    id: 'special-occasion',
    title: 'Special Occasion',
    description: 'One-off cooking for a birthday, anniversary or small celebration.',
    icon: 'gift-outline',
    suggestedFrequency: 'Monthly',
  },
  {
    id: 'monthly-stock-up',
    title: 'Monthly Stock-up',
    description: 'A larger batch-cooking session to fill your freezer for the month.',
    icon: 'archive-outline',
    suggestedFrequency: 'Monthly',
  },
];

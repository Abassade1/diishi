export type Cuisine =
  | 'Yoruba'
  | 'Igbo'
  | 'Hausa'
  | 'Continental'
  | 'Pastries & Baking'
  | 'Vegan & Plant-based'
  | 'Grills & BBQ'
  | 'Seafood';

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  visitTag?: string;
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
  coverPhoto: string;
  city: 'Lagos' | 'Abuja';
  area: string;
  rating: number;
  reviewCount: number;
  specialties: Cuisine[];
  pricePerVisit: number;
  yearsExperience: number;
  bio: string;
  verified: boolean;
  responseTime: string;
  completedBookings: number;
  gallery: string[];
  reviews: Review[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: Cuisine;
  tags: string[];
  calories: number;
  spiceLevel: 0 | 1 | 2 | 3;
  chefIds: string[];
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  chefId: string;
  status: BookingStatus;
  serviceType: string;
  date: string; // ISO date
  time: string;
  recurring: boolean;
  frequency?: 'Weekly' | 'Bi-weekly' | 'Monthly';
  address: string;
  guestCount: number;
  dishes: string[]; // dish ids
  price: number;
  rated?: boolean;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: 'me' | string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  chefId: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: ChatMessage[];
}

export interface OnboardingPreferences {
  householdSize: number | null;
  dietaryPreferences: string[];
  cookingCadence: string | null;
}

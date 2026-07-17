import { ChatThread } from '@/types';

export const chatThreads: ChatThread[] = [
  {
    id: 'thread-1',
    chefId: 'chef-1',
    lastMessage: 'Sounds good, see you Sunday at 10am!',
    lastMessageTime: '9:42 AM',
    unread: 0,
    messages: [
      {
        id: 'm1-1',
        threadId: 'thread-1',
        senderId: 'chef-1',
        text: 'Good morning! Just confirming our session this Sunday for the weekly prep.',
        timestamp: '2026-07-15T08:10:00',
      },
      {
        id: 'm1-2',
        threadId: 'thread-1',
        senderId: 'me',
        text: 'Morning Chef Adaeze! Yes that works. Could we swap the fried rice for egusi this week?',
        timestamp: '2026-07-15T08:20:00',
      },
      {
        id: 'm1-3',
        threadId: 'thread-1',
        senderId: 'chef-1',
        text: 'No problem at all, I’ll bring extra stockfish for it too.',
        timestamp: '2026-07-15T08:25:00',
      },
      {
        id: 'm1-4',
        threadId: 'thread-1',
        senderId: 'me',
        text: 'Perfect, thank you!',
        timestamp: '2026-07-15T09:40:00',
      },
      {
        id: 'm1-5',
        threadId: 'thread-1',
        senderId: 'chef-1',
        text: 'Sounds good, see you Sunday at 10am!',
        timestamp: '2026-07-15T09:42:00',
      },
    ],
  },
  {
    id: 'thread-2',
    chefId: 'chef-2',
    lastMessage: 'I’ll bring the grill and extra charcoal for 8 guests.',
    lastMessageTime: 'Yesterday',
    unread: 2,
    messages: [
      {
        id: 'm2-1',
        threadId: 'thread-2',
        senderId: 'me',
        text: 'Hi Chef Bolaji, we might have 2 extra guests this Sunday, is that okay?',
        timestamp: '2026-07-14T18:00:00',
      },
      {
        id: 'm2-2',
        threadId: 'thread-2',
        senderId: 'chef-2',
        text: 'That’s fine! I’ll adjust the asun and skewer quantities.',
        timestamp: '2026-07-14T18:20:00',
      },
      {
        id: 'm2-3',
        threadId: 'thread-2',
        senderId: 'chef-2',
        text: 'I’ll bring the grill and extra charcoal for 8 guests.',
        timestamp: '2026-07-14T18:21:00',
      },
    ],
  },
  {
    id: 'thread-3',
    chefId: 'chef-5',
    lastMessage: 'Thank you for the kind words, see you next week!',
    lastMessageTime: 'Mon',
    unread: 0,
    messages: [
      {
        id: 'm3-1',
        threadId: 'thread-3',
        senderId: 'me',
        text: 'The kids loved the moi moi this week, thank you Chef Ronke!',
        timestamp: '2026-07-13T14:00:00',
      },
      {
        id: 'm3-2',
        threadId: 'thread-3',
        senderId: 'chef-5',
        text: 'Thank you for the kind words, see you next week!',
        timestamp: '2026-07-13T14:10:00',
      },
    ],
  },
  {
    id: 'thread-4',
    chefId: 'chef-4',
    lastMessage: 'I can prep a vegan-only batch for your partner separately.',
    lastMessageTime: 'Jul 9',
    unread: 0,
    messages: [
      {
        id: 'm4-1',
        threadId: 'thread-4',
        senderId: 'chef-4',
        text: 'For next week, would you like me to keep the tofu stir-fry vegan-only or add chicken for you?',
        timestamp: '2026-07-09T11:00:00',
      },
      {
        id: 'm4-2',
        threadId: 'thread-4',
        senderId: 'me',
        text: 'Keep mine with chicken please, my partner stays vegan.',
        timestamp: '2026-07-09T11:15:00',
      },
      {
        id: 'm4-3',
        threadId: 'thread-4',
        senderId: 'chef-4',
        text: 'I can prep a vegan-only batch for your partner separately.',
        timestamp: '2026-07-09T11:16:00',
      },
    ],
  },
];

export const getThreadById = (id: string): ChatThread | undefined =>
  chatThreads.find((thread) => thread.id === id);

export const getThreadByChefId = (chefId: string): ChatThread | undefined =>
  chatThreads.find((thread) => thread.chefId === chefId);

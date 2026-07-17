import { Faq } from '@/types';

export const faqs: Faq[] = [
  {
    id: 'faq-1',
    category: 'Bookings',
    question: 'How does recurring meal prep work?',
    answer:
      'Choose a cadence (weekly, bi-weekly or monthly) when you book a chef. They\'ll automatically be scheduled for future visits, and you can adjust the menu, guest count or address before each one from the Bookings tab.',
  },
  {
    id: 'faq-2',
    category: 'Bookings',
    question: 'Can I change my chef for a single visit?',
    answer:
      'Yes. Open the visit from your Bookings tab and choose a different chef for that occurrence — your recurring plan with your regular chef is unaffected.',
  },
  {
    id: 'faq-3',
    category: 'Bookings',
    question: 'How do I cancel or reschedule a visit?',
    answer:
      'Message your chef directly from the Messages tab, or contact support at least 24 hours before the scheduled visit to avoid a late cancellation fee.',
  },
  {
    id: 'faq-4',
    category: 'Payments',
    question: 'How is payment collected?',
    answer:
      'All payments are processed securely through Paystack. You can pay per visit or save with a 4-visit monthly subscription bundle.',
  },
  {
    id: 'faq-5',
    category: 'Payments',
    question: 'Can I get a refund for a cancelled visit?',
    answer:
      'Refunds for cancellations made more than 24 hours in advance are processed back to your original payment method within 5–7 business days.',
  },
  {
    id: 'faq-6',
    category: 'Chefs',
    question: 'How are chefs vetted?',
    answer:
      'Every chef on Diishi goes through identity verification, a hygiene and food safety check, and a trial cook session before they can accept bookings.',
  },
  {
    id: 'faq-7',
    category: 'Chefs',
    question: 'What if I\'m not happy with a visit?',
    answer:
      'Rate the visit honestly and leave feedback — our team reviews every rating below 4 stars and will follow up to make it right.',
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));

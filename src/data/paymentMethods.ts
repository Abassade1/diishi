import { PaymentMethod } from '@/types';

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    brand: 'Verve',
    last4: '4821',
    expiry: '09/27',
    isDefault: true,
  },
  {
    id: 'pm-2',
    brand: 'Mastercard',
    last4: '1092',
    expiry: '03/26',
    isDefault: false,
  },
];

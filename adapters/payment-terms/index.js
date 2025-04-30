import { arrayAdapter } from '@/adapters/common';

export const responsePaymentTermsAdapter = ({ data }) => {
  return arrayAdapter(data);
};

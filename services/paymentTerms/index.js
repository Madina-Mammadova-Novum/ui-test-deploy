import { getData } from '@/utils/dataFetching';

export const getDemurragePaymentTerms = async () => {
  const response = await getData(`payment-terms/demurrage-payment-terms`);
  return {
    ...response,
  };
};

export const getPaymentTerms = async () => {
  const response = await getData(`payment-terms`);
  return {
    ...response,
  };
};

import { objectAdapter } from '@/adapters/common';

export const responseFreightEstimationAdapter = ({ data }) => {
  return objectAdapter(data);
};

export const responseMaxSearchableQuantityAdapter = ({ data }) => {
  return objectAdapter(data);
};

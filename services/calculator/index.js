import { getData } from '@/utils/dataFetching';

/**
 * Fetches the maximum searchable quantity allowed for cargo search
 * @returns {Promise} A promise that resolves with the max searchable quantity data
 */
export const getMaxSearchableQuantity = async () => {
  const response = await getData('calculator/maxsearchablequantity');
  return response;
};

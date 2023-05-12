import { getData } from '@/utils/dataFetching';

export const getProducts = async (cargoTypeId) => {
  const response = await getData(`cargotypes/${cargoTypeId}/products`);
  return {
    ...response,
  };
};

import { getData } from '@/utils/dataFetching';

export const getCities = async (countryId, { query = '', skip = 0, pageSize = 10 } = {}) => {
  const response = await getData(`countries/${countryId}/cities?query=${query}&skip=${skip}&pageSize=${pageSize}`);
  return {
    ...response,
  };
};

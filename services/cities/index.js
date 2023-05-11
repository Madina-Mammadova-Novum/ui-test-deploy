import { getData } from '@/utils/dataFetching';

export const getCities = async (countryId) => {
  const response = await getData(`countries/${countryId}/cities`);
  const { data } = response;
  return data;
};

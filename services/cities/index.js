import { citiesAdapter } from '@/adapters/city';
import { getData } from '@/utils/dataFetching';

export const getCities = async (countryId) => {
  const response = await getData(`countries/${countryId}/cities`);
  return citiesAdapter(response);
};

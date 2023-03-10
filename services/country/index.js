import { countriesAdapter } from '@/adapters/country';
import { getData } from '@/utils/dataFetching';

export const getCountries = async () => {
  const response = await getData(`countries`);
  return countriesAdapter(response);
};

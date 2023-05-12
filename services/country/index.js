import { getData } from '@/utils/dataFetching';

export const getCountries = async () => {
  const response = await getData(`countries`);
  return {
    ...response,
  };
};

import { getData } from '@/utils/dataFetching';

export const getCountries = async () => {
  const response = await getData(`countries`);
  const { data } = response;
  return data;
};

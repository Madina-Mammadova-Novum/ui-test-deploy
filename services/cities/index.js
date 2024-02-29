import { getData } from '@/utils/dataFetching';
import { convertDataToOptions } from '@/utils/helpers';

export const getCities = async (countryId) => {
  const response = await getData(`countries/${countryId}/cities`);
  return {
    ...response,
  };
};

export const getChatCity = async (id) => {
  const res = await getCities(id);
  const params = convertDataToOptions(res, 'cityId', 'cityName');
  return { options: params };
};

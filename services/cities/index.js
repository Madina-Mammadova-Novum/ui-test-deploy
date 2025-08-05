import { getData } from '@/utils/dataFetching';
import { convertDataToOptions } from '@/utils/helpers';

export const getCities = async (countryId, { query = '', skip = 0, pageSize = 10 } = {}) => {
  const response = await getData(`countries/${countryId}/cities?query=${query}&skip=${skip}&pageSize=${pageSize}`);
  return {
    ...response,
  };
};

export const getChatCity = async (id) => {
  const res = await getCities(id, {});
  const params = convertDataToOptions(res.data, 'cityId', 'cityName');
  return { options: params };
};

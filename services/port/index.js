import { getData } from '@/utils/dataFetching';

export const getPorts = async ({ query = '', skip = 0, pageSize = 10 }) => {
  const response = await getData(`ports?skip=${skip}&pageSize=${pageSize}${query && `&query=${query}`}`);
  return {
    ...response,
  };
};

export const getPortsForSearchForm = async ({ query = '', skip = 0, pageSize = 10 }) => {
  const response = await getData(
    `ports/search-form-ports?skip=${skip}&pageSize=${pageSize}${query && `&query=${query}`}`
  );

  return {
    ...response,
  };
};

export const getAdditionalDischargeOptions = async ({ query = '' }) => {
  const response = await getData(`ports/additional-discharge-options?SearchValue=${query}`);

  return {
    ...response,
  };
};

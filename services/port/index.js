import { getData } from '@/utils/dataFetching';

export const getPorts = async () => {
  const response = await getData(`ports`);
  return {
    ...response,
  };
};

export const getPortsForSearcForm = async () => {
  const response = await getData(`ports/search-form-ports`);

  return {
    ...response,
  };
};

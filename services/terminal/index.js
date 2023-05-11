import { getData } from '@/utils/dataFetching';

export const getTerminals = async (portId) => {
  const response = await getData(`ports/${portId}/terminals`);
  const { data } = response;
  return data;
};

import { getData } from '@/utils/dataFetching';

export const getCargoTypes = async () => {
  const response = await getData(`cargotypes`);
  const { data } = response;
  return data;
};

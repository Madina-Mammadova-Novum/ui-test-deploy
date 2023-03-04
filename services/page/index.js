import { entityDataAdapter } from '@/adapters/entityData';
import { getData } from '@/utils/dataFetching';

export const getPage = async ({ data }) => {
  console.log({ temp: data });
  const response = await getData(`page`);
  return entityDataAdapter(response);
};

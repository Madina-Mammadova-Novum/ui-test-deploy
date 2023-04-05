import { entityDataAdapter } from '@/adapters/entityData';
import { getData } from '@/utils/dataFetching';

export async function getPage({ data }) {
  console.log({ temp: data });
  const response = await getData(`page`);
  return entityDataAdapter(response);
}

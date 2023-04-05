import { entityDataAdapter } from '@/adapters/entityData';
import { getData } from '@/utils/dataFetching';

export async function getPage() {
  const response = await getData(`page`);
  return entityDataAdapter(response);
}

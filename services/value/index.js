import { valueAdapter } from '@/adapters/value';
import { getData } from '@/utils/dataFetching';

export const getValue = async (valueId) => {
  const response = await getData(`collection-type/values/${valueId}`);
  return {
    ...response,
    data: valueAdapter(response),
  };
};

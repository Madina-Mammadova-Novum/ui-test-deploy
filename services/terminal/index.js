import { terminalsAdapter } from '@/adapters/terminal';
import { getData } from '@/utils/dataFetching';

export const getTerminals = async (portId) => {
  const response = await getData(`ports/${portId}/terminals`);
  return terminalsAdapter(response);
};

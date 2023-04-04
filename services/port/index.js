import { portsAdapter } from '@/adapters';
import { getData } from '@/utils/dataFetching';

export const getPorts = async () => {
  const response = await getData(`ports`);
  return portsAdapter(response);
};

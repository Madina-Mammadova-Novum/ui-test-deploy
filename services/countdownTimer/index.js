import { getData } from '@/utils/dataFetching';

export const getCountdownConfigs = async ({ purpose = null } = {}) => {
  const queryParams = purpose ? `?purpose=${purpose}` : '';
  const response = await getData(`countdown-configs${queryParams}`);
  return {
    ...response,
  };
};

import { getData } from '@/utils/dataFetching';

export const getCountdownTimer = async () => {
  const response = await getData(`countdown-timer`);
  return {
    ...response,
  };
};

export const getCountdownConfigs = async ({ purpose = null } = {}) => {
  const queryParams = purpose ? `?purpose=${purpose}` : '';
  const response = await getData(`countdown-configs${queryParams}`);
  return {
    ...response,
  };
};

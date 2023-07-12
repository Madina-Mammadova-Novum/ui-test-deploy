import { getData } from '@/utils/dataFetching';

export const getCountdownTimer = async () => {
  const response = await getData(`countdown-timer`);
  return {
    ...response,
  };
};

import { getData } from '@/utils/dataFetching';

export const getClearanceFiles = async () => {
  const response = await getData(`clearance-files`);
  return {
    ...response,
  };
};

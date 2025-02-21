import { getData } from '@/utils/dataFetching';

export const getBaseCharterPartyTemplates = async ({ query = '', skip = 0, pageSize = 100 }) => {
  const response = await getData(`base-cp-templates?skip=${skip}&pageSize=${pageSize}${query && `&query=${query}`}`);

  return {
    ...response,
  };
};

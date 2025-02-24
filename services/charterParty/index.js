import { getData, postData } from '@/utils/dataFetching';

export const getBaseCharterPartyTemplates = async ({ query = '', skip = 0, pageSize = 100 }) => {
  const response = await getData(`base-cp-templates?skip=${skip}&pageSize=${pageSize}${query && `&query=${query}`}`);

  return {
    ...response,
  };
};

export const proposeBaseCharterParty = async ({ dealId, baseCPTemplateId }) => {
  const response = await postData(`base-cp-templates/propose`, {
    dealId,
    baseCPTemplateId,
  });

  return {
    ...response,
  };
};

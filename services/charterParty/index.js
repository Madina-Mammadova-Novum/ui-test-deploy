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

export const acceptBaseCharterParty = async ({ dealId, proposalId }) => {
  const response = await postData(`base-cp-templates/accept`, {
    dealId,
    proposalId,
  });

  return {
    ...response,
  };
};

export const counterproposeBaseCharterParty = async ({ dealId, newBaseCPTemplateId, proposalId }) => {
  const response = await postData(`base-cp-templates/counterpropose`, {
    dealId,
    newBaseCPTemplateId,
    proposalId,
  });

  return {
    ...response,
  };
};

/**
 * @service getCharterPartyPreview
 * @description Gets the preview URL for a charter party document
 * @param {Object} params - The parameters for the request
 * @param {string} params.dealId - The ID of the deal
 * @returns {Promise<Object>} A promise that resolves with the preview URL
 * @maritime Retrieves the charter party document URL for viewing
 */
export const getCharterPartyPreview = async ({ dealId }) => {
  const response = await postData(`base-cp-templates/preview`, {
    dealId,
  });

  return {
    ...response,
  };
};

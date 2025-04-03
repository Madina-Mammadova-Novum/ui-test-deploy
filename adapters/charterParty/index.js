export const requestCharterPartyAdapter = ({ data }) => {
  if (!data) return [];

  return data;
};

/**
 * @util charterPartyPreviewAdapter
 * @description Adapts the charter party preview response
 * @param {Object} param0 - The response object
 * @param {Object} param0.data - The data from the API response
 * @returns {Object} The adapted data with the preview URL
 */
export const charterPartyPreviewAdapter = ({ data }) => {
  if (!data) return { url: null };

  return {
    url: data.url || null,
  };
};

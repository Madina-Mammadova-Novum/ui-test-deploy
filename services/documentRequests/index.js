import { getData, postData } from '@/utils/dataFetching';

export const getDocumentRequests = async ({ dealId }) => {
  const response = await getData(`document-requests/${dealId}`);

  return {
    ...response,
  };
};

export const createDocumentRequest = async ({ dealId, title, requestedFiles }) => {
  const response = await postData('document-requests/request', {
    dealId,
    title,
    requestedFiles,
  });
  return {
    ...response,
  };
};

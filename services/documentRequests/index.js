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

export const completeUploadDocumentRequest = async ({ requestId }) => {
  const response = await postData('document-requests/complete-upload', {
    requestId,
  });
  return {
    ...response,
  };
};

export const approveDocumentRequest = async ({ requestId }) => {
  const response = await postData('document-requests/approve', {
    requestId,
  });
  return {
    ...response,
  };
};

export const revisionDocumentRequest = async ({ requestId, comment }) => {
  const response = await postData('document-requests/revision', {
    requestId,
    comment,
  });
  return {
    ...response,
  };
};

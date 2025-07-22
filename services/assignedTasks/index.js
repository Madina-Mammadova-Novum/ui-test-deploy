import { getData, postData } from '@/utils/dataFetching';

export const getAssignedTasks = async ({ targetId, purpose, status }) => {
  // Build query parameters
  const queryParams = new URLSearchParams();

  if (targetId) {
    queryParams.append('targetId', targetId);
  }

  if (purpose) {
    queryParams.append('purpose', purpose);
  }

  if (status && Array.isArray(status) && status.length > 0) {
    status.forEach((s) => queryParams.append('status', s));
  }

  const queryString = queryParams.toString();
  const endpoint = `assigned-tasks${queryString ? `?${queryString}` : ''}`;

  const response = await getData(endpoint);
  return response;
};

export const getTaskExtensionTimeOptions = async ({ taskId }) => {
  const endpoint = `assigned-tasks/${taskId}/extension-time-options`;

  const response = await getData(endpoint);
  return response;
};

export const submitTaskExtensionRequest = async ({ taskId, data }) => {
  const endpoint = `assigned-tasks/${taskId}/extension-requests`;

  const response = await postData(endpoint, data);
  return response;
};

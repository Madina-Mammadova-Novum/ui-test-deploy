import { getData } from '@/utils/dataFetching';

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

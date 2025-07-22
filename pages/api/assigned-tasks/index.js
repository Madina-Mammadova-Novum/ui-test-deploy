import { assignedTasksAdapter } from '@/adapters/assignedTasks';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { targetId, purpose, status } = req.query;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (targetId) {
    queryParams.append('targetId', targetId);
  }

  if (purpose) {
    queryParams.append('purpose', purpose);
  }

  if (status) {
    // Handle status as array - if it's a string, split by comma
    const statusArray = Array.isArray(status) ? status : status.split(',');
    statusArray.forEach((s) => queryParams.append('status', s.trim()));
  }

  const queryString = queryParams.toString();
  const endpoint = `v1/assignedtasks${queryString ? `?${queryString}` : ''}`;

  return responseHandler({
    req,
    res,
    path: getApiURL(endpoint),
    dataAdapter: assignedTasksAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

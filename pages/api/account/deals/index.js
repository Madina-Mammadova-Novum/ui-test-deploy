import { nullAdapter } from '@/adapters/common';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);

  const { filters = {}, sorting = {}, skip = 0, pageSize = 10, dataAdapter = nullAdapter } = req.body;
  const queryData = { ...filters, ...sorting };

  // Handle specific query parameters like IsFailed
  const specificQueries = [];
  if (req.body.IsFailed) {
    specificQueries.push('IsFailed=true');
  }

  // Build query string from queryData
  const queryParams = Object.keys(queryData).reduce((result, curr) => {
    // Handle arrays specially (like Stages)
    if (curr === 'Stages' && Array.isArray(queryData[curr])) {
      return queryData[curr].reduce((acc, stage) => `${acc}&Stages=${stage}`, result);
    }
    // Handle other params
    return queryData[curr] ? `${result}&${curr}=${queryData[curr]}` : result;
  }, specificQueries.join('&'));

  // Construct final API path with query parameters
  const apiPath = getApiURL(
    `v1/${role}/deals/searchdeal?Skip=${skip}&PageSize=${pageSize}${queryParams ? `&${queryParams}` : ''}`
  );

  return responseHandler({
    req,
    res,
    path: apiPath,
    dataAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

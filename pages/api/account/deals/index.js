import { nullAdapter } from '@/adapters/common';
import { responseFailedOffersAdapter } from '@/adapters/failed-offers';
import { responsePostFixtureAdapter } from '@/adapters/post-fixture';
import { responseOwnerPrefixtureAdapter } from '@/adapters/pre-fixture';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);

  const { filters = {}, sorting = {}, skip = 0, pageSize = 10, dataAdapterType } = req.body;
  const queryData = { ...filters, ...sorting };

  // Determine which data adapter to use based on the request
  let dataAdapter = nullAdapter;
  switch (dataAdapterType) {
    case 'responseOwnerPrefixtureAdapter':
      dataAdapter = responseOwnerPrefixtureAdapter;
      break;
    case 'responsePostFixtureAdapter':
      dataAdapter = responsePostFixtureAdapter;
      break;
    case 'responseFailedOffersAdapter':
      dataAdapter = responseFailedOffersAdapter;
      break;
    default:
      dataAdapter = nullAdapter;
  }

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

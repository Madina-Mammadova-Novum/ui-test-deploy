import { responseFailedOffersAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);

  const { filters, sorting } = req.body;
  const queryData = { ...filters, ...sorting };

  const isFailed = req.body.IsFailed;
  const isFailedQuery = isFailed ? '&IsFailed=true' : '';

  const queryParams = Object.keys(queryData).reduce((result, curr) => {
    // Handle stages array specially
    if (curr === 'Stages' && Array.isArray(queryData[curr])) {
      return `${result}${queryData[curr].reduce((stagesQuery, stage) => `${stagesQuery}&Stages=${stage}`, '')}`;
    }
    // Handle other params as before
    return `${result}${queryData[curr] ? `&${curr}=${queryData[curr]}` : ''}`;
  }, '');

  return responseHandler({
    req,
    res,
    path: getApiURL(
      `v1/${role}/deals/searchdeal?Skip=${req.body.skip}&PageSize=${req.body.pageSize}${isFailedQuery}${queryParams}`
    ),
    dataAdapter: responseFailedOffersAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

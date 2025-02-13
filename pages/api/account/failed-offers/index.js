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
    // eslint-disable-next-line no-param-reassign
    result += queryData[curr] ? `&${curr}=${queryData[curr]}` : '';
    return result;
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

import { responseOwnerPrefixtureAdapter } from '@/adapters';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);

  const { filters, sorting } = req.body;
  const queryData = { ...filters, ...sorting };

  const queryParams = Object.keys(queryData).reduce((result, curr) => {
    // eslint-disable-next-line no-param-reassign
    result += queryData[curr] ? `&${curr}=${queryData[curr]}` : '';
    return result;
  }, '');

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${role}/deals/postfixture?Skip=${req.body.skip}&PageSize=${req.body.pageSize}${queryParams}`),
    dataAdapter: responseOwnerPrefixtureAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

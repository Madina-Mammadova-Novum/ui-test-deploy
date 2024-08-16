import { responseGetSavedSearchAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { query = '', skip = 0, pageSize = 10, sortColumnDirection = 'asc' } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(
      `v1/charterer/savedsearches?Skip=${skip}&PageSize=${pageSize}&SortColumnDirection=${sortColumnDirection}${query && `&query=${query}`}`
    ),
    dataAdapter: responseGetSavedSearchAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

import { responseGetVesselCategoryTwoAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  const { categoryOneId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vesselcategorytwos?VesselCategoryOneId=${categoryOneId}`),
    dataAdapter: responseGetVesselCategoryTwoAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

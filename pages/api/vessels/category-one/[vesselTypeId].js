import { responseGetVesselCategoryOneAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  const { vesselTypeId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vesselcategoryones?VesselTypeId=${vesselTypeId}`),
    dataAdapter: responseGetVesselCategoryOneAdapter,
    requestMethod: 'GET',
    options: { headers: Authorization(token) },
  });
}

import { getServerSession } from 'next-auth';

import { responseGetVesselCategoryOneAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { vesselTypeId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vesselcategoryones?VesselTypeId=${vesselTypeId}`),
    dataAdapter: responseGetVesselCategoryOneAdapter,
    requestMethod: 'GET',
    options: { ...Authorization(session?.accessToken) },
    customErrorHandling: true,
  });
}

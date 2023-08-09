import { getServerSession } from 'next-auth';

import { responseGetVesselCategoryTwoAdapter } from '@/adapters/vessel';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { categoryOneId } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vesselcategorytwos?VesselCategoryOneId=${categoryOneId}`),
    dataAdapter: responseGetVesselCategoryTwoAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken) } },
    customErrorHandling: true,
  });
}

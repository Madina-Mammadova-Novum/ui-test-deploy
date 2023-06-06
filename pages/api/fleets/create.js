import { responseCreateFleetAdapter } from '@/adapters';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getServerSession } from 'next-auth';

import { Authorization } from '@/lib/constants';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets`),
    dataAdapter: responseCreateFleetAdapter,
    requestMethod: 'POST',
    options: { ...Authorization(session?.accessToken) },
    customErrorHandling: true,
  });
}

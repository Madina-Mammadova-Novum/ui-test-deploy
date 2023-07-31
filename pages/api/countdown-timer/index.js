import { getServerSession } from 'next-auth';

import { responseCountdownTimerAdapter } from '@/adapters/countdownTimer';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/countdowntimersettings`),
    dataAdapter: responseCountdownTimerAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken) } },
  });
}

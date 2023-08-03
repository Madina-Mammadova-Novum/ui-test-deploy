import { getServerSession } from 'next-auth';

import { notificationsAdapter } from '@/adapters/notifications';
import { Authorization } from '@/lib/constants';
import { getRtURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getRtURL(`notifications/markallasread`),
    dataAdapter: notificationsAdapter,
    requestMethod: 'POST',
    options: { headers: { ...Authorization(session?.accessToken) } },
  });
}

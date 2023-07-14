import { getServerSession } from 'next-auth';

// import { accountNavigationAdapter } from '@/adapters/navigation';
import { positionsAdapter } from '@/adapters/user';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  // req.body = accountNavigationAdapter({ data: req.query });

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/fleets/all`),
    dataAdapter: positionsAdapter,
    requestMethod: 'POST',
    options: { ...Authorization(session?.accessToken), ...ContentTypeJson() },
  });
}

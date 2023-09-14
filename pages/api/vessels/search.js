import { getServerSession } from 'next-auth';

import { responseSearchVesselsAdapter } from '@/adapters/vessel';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/vessels/search`),
    dataAdapter: responseSearchVesselsAdapter,
    requestMethod: 'POST',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}

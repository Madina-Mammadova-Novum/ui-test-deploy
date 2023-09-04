import { getServerSession } from 'next-auth';

import { responseChartererPrefixtureAdapter } from '@/adapters';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { Skip, PageSize } = req?.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/charterer/deals/prefixture?Skip=${Skip}&PageSize=${PageSize}`),
    dataAdapter: responseChartererPrefixtureAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
  });
}

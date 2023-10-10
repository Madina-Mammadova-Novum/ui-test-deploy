import { getServerSession } from 'next-auth';

import { responseChartererNegotiatingAdapter } from '@/adapters/negotiating';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  const { skip, pageSize } = JSON.parse(req.body);

  console.log(req.body);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/charterer/cargoes?Skip=${skip}&PageSize=${pageSize}`),
    dataAdapter: responseChartererNegotiatingAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
  });
}

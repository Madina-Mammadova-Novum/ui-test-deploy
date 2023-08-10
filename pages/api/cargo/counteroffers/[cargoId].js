import { getServerSession } from 'next-auth';

import { responseCargoCounteroffersAdapter } from '@/adapters/cargo';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  const { cargoId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/charterer/deals/counteroffers?CargoId=${cargoId}`),
    dataAdapter: responseCargoCounteroffersAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
    customErrorHandling: true,
  });
}

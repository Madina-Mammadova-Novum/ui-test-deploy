import { approveChangeRequestAdapter } from '@/adapters/approvals';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { id } = req.body;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/approvals/${id}/approve`),
    dataAdapter: approveChangeRequestAdapter,
    requestMethod: 'PUT',
    options: { headers: Authorization(token) },
  });
}

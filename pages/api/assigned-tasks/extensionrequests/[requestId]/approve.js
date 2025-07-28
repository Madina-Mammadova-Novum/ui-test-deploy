import { objectAdapter } from '@/adapters/common';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);
  const { requestId } = req.query;

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/assignedtasks/extensionrequests/${requestId}/approve`),
    dataAdapter: objectAdapter,
    requestMethod: 'POST',
    options: { headers: { ...Authorization(token), ...ContentTypeJson() } },
  });
}

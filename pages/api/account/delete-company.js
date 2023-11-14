import delve from 'dlv';
import { getServerSession } from 'next-auth';

import { accountDeleteDataResponseAdapter } from '@/adapters/user';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { errorHandler, responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  const password = delve(req, 'body');

  if (!password) {
    return errorHandler(res, 422, 'Please provide the required field "password"');
  }

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${session?.role}/company/delete`),
    dataAdapter: accountDeleteDataResponseAdapter,
    requestMethod: 'DELETE',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
  });
}

import { updatePasswordResponseAdapter } from '@/adapters/user';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/updatepassword`),
    dataAdapter: updatePasswordResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...Authorization(token), ...ContentTypeJson() } },
  });
}

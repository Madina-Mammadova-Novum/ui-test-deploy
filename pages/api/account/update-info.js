import { accountPeronalDataResponseAdapter } from '@/adapters/user';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { getCookieFromServer } from '@/utils/helpers';

export default async function handler(req, res) {
  const role = getCookieFromServer('session-user-role', req);
  const token = getCookieFromServer('session-access-token', req);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${role}/profile/update`),
    dataAdapter: accountPeronalDataResponseAdapter,
    requestMethod: 'PUT',
    options: { headers: { ...Authorization(token), ...ContentTypeJson() } },
  });
}

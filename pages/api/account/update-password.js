import delve from 'dlv';
import { getServerSession } from 'next-auth';

import { updatePasswordResponseAdapter } from '@/adapters/user';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { errorHandler, responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  const oldPassword = delve(req, 'body.oldPassword');
  const newPassword = delve(req, 'body.newPassword');

  if (!oldPassword || !newPassword) {
    // todo: add additional condition
    return errorHandler(res, 422, 'One or more validation occured');
  }

  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/updatepassword`),
    dataAdapter: updatePasswordResponseAdapter,
    requestMethod: 'POST',
    options: { ...Authorization(session?.accessToken), ...ContentTypeJson() },
  });
}

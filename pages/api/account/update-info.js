import { getServerSession } from 'next-auth';

import { accountPeronalDataResponseAdapter } from '@/adapters/user';
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${session?.role}/profile/update`),
    dataAdapter: accountPeronalDataResponseAdapter,
    requestMethod: 'PUT',
    options: { ...Authorization(session?.accessToken) },
  });
}

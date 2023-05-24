import { getServerSession } from 'next-auth';

import { accountPeronalDataResponseAdapter } from '@/adapters/user'; // identityHandler,
import { Authorization } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);

  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/owner/company/profile`),
    dataAdapter: accountPeronalDataResponseAdapter,
    requestMethod: 'GET',
    options: { ...Authorization(session?.accessToken) },
  });
}

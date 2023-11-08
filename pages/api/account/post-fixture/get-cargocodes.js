/* eslint-disable no-param-reassign */
import { getServerSession } from 'next-auth';

import { responseOwnerPrefixtureAdapter } from '@/adapters';
import { Authorization, ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';
import { AUTHCONFIG } from '@/utils/auth';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, AUTHCONFIG);
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${session.role}/deals/post-fixture/cargocodes`),
    dataAdapter: responseOwnerPrefixtureAdapter,
    requestMethod: 'GET',
    options: { headers: { ...Authorization(session?.accessToken), ...ContentTypeJson() } },
  });
}

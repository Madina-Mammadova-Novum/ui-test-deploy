import { confirmEmailResponseAdapter } from '@/adapters/user';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/confirmemail`),
    dataAdapter: confirmEmailResponseAdapter,
    requestMethod: 'POST',
  });
}

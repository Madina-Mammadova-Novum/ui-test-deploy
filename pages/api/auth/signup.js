import { signupResponseAdapter } from '@/adapters/user';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const { type } = req.query;
  return responseHandler({
    req,
    res,
    path: getApiURL(`v1/${type}/company/create`),
    dataAdapter: signupResponseAdapter,
    requestMethod: 'POST',
  });
}

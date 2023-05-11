import { forgotPasswordResponseAdapter } from '@/adapters/user';
import { getApiURL } from '@/utils';
import { bodyObject } from '@/utils/api';
import { errorHandler, responseHandler } from '@/utils/dataFetching';

export default async function handler(req, res) {
  const { email } = bodyObject(req);
  if (!email) {
    return errorHandler(res, 422, 'Please provide the required fields email');
  }
  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/forgotpassword`),
    dataAdapter: forgotPasswordResponseAdapter,
    requestMethod: 'POST',
  });
}

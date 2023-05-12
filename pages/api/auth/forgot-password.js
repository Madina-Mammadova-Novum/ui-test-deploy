import delve from 'dlv';

import { forgotPasswordResponseAdapter } from '@/adapters/user';
import { getApiURL } from '@/utils';
import { errorHandler, responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const email = delve(req, 'body.email');
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

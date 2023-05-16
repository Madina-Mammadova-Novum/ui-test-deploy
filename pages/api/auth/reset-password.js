import delve from 'dlv';

import { resetPasswordResponseAdapter } from '@/adapters/user';
import { getApiURL } from '@/utils';
import { errorHandler, responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const password = delve(req, 'body.newPassword');
  if (!password) {
    // todo: add additional condition
    return errorHandler(res, 422, 'Please provide the required fields password');
  }
  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/resetpasword`),
    dataAdapter: resetPasswordResponseAdapter,
    requestMethod: 'POST',
  });
}

import { resetPasswordResponseAdapter } from '@/adapters/user';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/resetpasword`),
    dataAdapter: resetPasswordResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeJson() } },
  });
}

import { phoneAvailabilityResponseAdapter } from '@/adapters/user';
import { ContentTypeJson } from '@/lib/constants';
import { getApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(`auth/phonenumberavailablestatus`),
    dataAdapter: phoneAvailabilityResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeJson() } },
  });
}

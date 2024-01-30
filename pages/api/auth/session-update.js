import { refreshTokenResponseAdapter } from '@/adapters/user';
import { ContentTypeUrlEncoded } from '@/lib/constants';
import { setRefreshToken } from '@/models/refreshTokenModel';
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  req.body = setRefreshToken(req.body.token);

  return responseHandler({
    req,
    res,
    path: getIdentityApiURL(`connect/token`),
    dataAdapter: refreshTokenResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeUrlEncoded() } },
  });
}

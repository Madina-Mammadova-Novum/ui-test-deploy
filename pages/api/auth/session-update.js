import delve from 'dlv';
// import { revalidatePath } from 'next/cache';

import { refreshTokenResponseAdapter } from '@/adapters/user'; // identityHandler,
import { ROUTES } from '@/lib';
import { ContentTypeUrlEncoded } from '@/lib/constants';
import { setRefreshToken } from '@/models/refreshTokenModel';
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const refreshToken = delve(req, 'body.token');

  if (!refreshToken) {
    return res.redirect(422, ROUTES.LOGIN);
  }

  req.body = setRefreshToken(refreshToken);

  // revalidatePath('/');

  return responseHandler({
    req,
    res,
    path: getIdentityApiURL(`connect/token`),
    dataAdapter: refreshTokenResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeUrlEncoded() } },
  });
}

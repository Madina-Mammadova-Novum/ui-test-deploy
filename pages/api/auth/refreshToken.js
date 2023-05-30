import delve from 'dlv';

import { refreshTokenResponseAdapter } from '@/adapters/user'; // identityHandler,
import { ROUTES } from '@/lib';
import { setRefreshToken } from '@/models/refreshTokenModel';
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const refreshToken = delve(req, 'body.token');

  if (!refreshToken) {
    return res.redirect(422, ROUTES.LOGIN);
  }

  req.body = setRefreshToken(refreshToken);

  return responseHandler({
    req,
    res,
    path: getIdentityApiURL(`connect/token`),
    dataAdapter: refreshTokenResponseAdapter,
    requestMethod: 'POST',
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  });
}

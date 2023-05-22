import delve from 'dlv';

import { refreshTokenResponseAdapter } from '@/adapters/user'; // identityHandler,
import { ROUTES } from '@/lib';
import { setRefreshToken } from '@/models/refreshTokenModel';
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const token = delve(req, 'body.token');

  if (!token) {
    return res.redirect(422, ROUTES.LOGIN);
  }

  req.body = setRefreshToken(token);

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

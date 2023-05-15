import delve from 'dlv';

import { loginResponseAdapter } from '@/adapters/user'; // identityHandler,
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const username = delve(req, 'body.username');
  const password = delve(req, 'body.password');
  if (!username || !password) {
    return res.status(422).json({ error: { message: 'Please provide the required fields email and password' } });
  }
  return responseHandler({
    req,
    res,
    path: getIdentityApiURL(`connect/token`),
    dataAdapter: loginResponseAdapter,
    requestMethod: 'POST',
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  });
}

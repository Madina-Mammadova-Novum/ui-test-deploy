import delve from 'dlv';

import { loginResponseAdapter } from '@/adapters/user'; // identityHandler,
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  const email = delve(req, 'body.email');
  const password = delve(req, 'body.password');

  if (!email || !password) {
    return res.status(422).json({ error: { message: 'Please provide the required fields email and password' } });
  }

  const fd = new URLSearchParams();
  fd.append('grant_type', process.env.IDENTITY_API_GRANT_TYPE);
  fd.append('client_id', process.env.IDENTITY_API_CLIENT_ID);
  fd.append('client_secret', process.env.IDENTITY_API_CLIENT_SECRET);
  fd.append('username', email);
  fd.append('password', password);

  req.body = fd.toString();

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

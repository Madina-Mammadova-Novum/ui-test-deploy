import { loginResponseAdapter } from '@/adapters/user'; // identityHandler,
import { ContentTypeUrlEncoded } from '@/lib/constants';
import { setLogin } from '@/models/loginModel';
import { getIdentityApiURL } from '@/utils';
import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  req.body = setLogin(req?.body);

  return responseHandler({
    req,
    res,
    path: getIdentityApiURL(`connect/token`),
    dataAdapter: loginResponseAdapter,
    requestMethod: 'POST',
    options: { headers: { ...ContentTypeUrlEncoded() } },
  });
}

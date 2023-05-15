import { loginResponseAdapter } from '@/adapters/user'; // identityHandler,
// import { getIdentityApiURL } from '@/utils';
// import { responseHandler } from '@/utils/api';

export default async function handler(req, res) {
  if (!req.body) {
    return res.status(422).json({ error: { message: 'Please provide the required fields email and password' } });
  }
  return res.status(200).json(loginResponseAdapter({ data: { temp: true } }));
  // return responseHandler({
  //   req,
  //   res,
  //   path: getIdentityApiURL(`connect/token`),
  //   dataAdapter: loginResponseAdapter,
  //   requestMethod: 'POST',
  //   options: {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   },
  // });
}

// eslint-disable-next-line import/no-extraneous-dependencies
// import FormData from 'form-data';

import { bodyObject, unprocessableEntity } from '@/utils/api'; // identityHandler,

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export default async function handler(req, res) {
  const { email, password } = bodyObject(req);
  if (!email || !password) {
    return unprocessableEntity(res);
  }
  // req.body = new FormData();
  // req.body.append('client_id', process.env.IDENTITY_API_CLIENT_ID);
  // req.body.append('client_secret', process.env.IDENTITY_API_CLIENT_SECRET);
  // req.body.append('grant_type', 'password');
  // req.body.append('username', email);
  // req.body.append('password', password);
  // return identityHandler('connect/token', req, res);
  await sleep(2000);
  return res.status(200).json({
    message: 'Welcome back',
  });
}

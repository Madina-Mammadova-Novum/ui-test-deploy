import { postHandler } from '@/utils/api';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function handler(req, res) {
  if (req.body?.debug) {
    await sleep(2000);
    return res.status(200).json({
      message: 'You successfully verifficate your account',
    });
  }
  return postHandler('auth/confirmemail', req, res);
}

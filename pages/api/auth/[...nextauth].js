import NextAuth from 'next-auth/next';

import { AUTHCONFIG } from '@/utils/auth';

export default async function auth(req, res) {
  // eslint-disable-next-line no-return-await
  return await NextAuth(req, res, AUTHCONFIG);
}

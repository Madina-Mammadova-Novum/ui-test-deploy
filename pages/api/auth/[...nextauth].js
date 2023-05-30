import NextAuth from 'next-auth/next';

import { AUTHCONFIG } from '@/utils/auth';

export default NextAuth(AUTHCONFIG);

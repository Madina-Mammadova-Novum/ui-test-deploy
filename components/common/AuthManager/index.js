'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthManagerPropTypes } from '@/lib/types';

export default function AuthManager({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

AuthManager.propTypes = AuthManagerPropTypes;

'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthManagerPropTypes } from '@/lib/types';

export default function AuthManager({ children, session }) {
  return (
    <SessionProvider session={session} refetchInterval={60} refetchOnWindowFocus>
      {children}
    </SessionProvider>
  );
}

AuthManager.propTypes = AuthManagerPropTypes;

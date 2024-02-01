'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthManagerPropTypes } from '@/lib/types';

export default function AuthManager({ children, session }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={60}>
      {children}
    </SessionProvider>
  );
}

AuthManager.propTypes = AuthManagerPropTypes;

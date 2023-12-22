'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthManagerPropTypes } from '@/lib/types';

import { Hydrate } from '@/elements';

export default function AuthManager({ children, session }) {
  return (
    <Hydrate>
      <SessionProvider session={session} refetchInterval={60} refetchWhenOffline refetchOnWindowFocus>
        {children}
      </SessionProvider>
    </Hydrate>
  );
}

AuthManager.propTypes = AuthManagerPropTypes;

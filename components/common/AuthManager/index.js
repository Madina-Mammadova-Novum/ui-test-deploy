'use client';

import { SessionProvider } from 'next-auth/react';

import { AuthManagerPropTypes } from '@/lib/types';

import { Hydrate } from '@/elements';

export default function AuthManager({ children, session }) {
  return (
    <Hydrate loader={null}>
      <SessionProvider refetchOnWindowFocus refetchWhenOffline session={session}>
        {children}
      </SessionProvider>
    </Hydrate>
  );
}

AuthManager.propTypes = AuthManagerPropTypes;

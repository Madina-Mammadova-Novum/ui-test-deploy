'use client';

import { SessionProvider } from 'next-auth/react';

import { Hydrate } from '../../elements/Hydrate';

import { AuthManagerPropTypes } from '@/lib/types';

export default function AuthManager({ children, session }) {
  return (
    <Hydrate>
      <SessionProvider session={session} refetchInterval={60}>
        {children}
      </SessionProvider>
    </Hydrate>
  );
}

AuthManager.propTypes = AuthManagerPropTypes;

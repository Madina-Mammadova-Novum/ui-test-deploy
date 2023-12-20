'use client';

import { SessionProvider } from 'next-auth/react';

import SessionManager from '../SessionManager';

import { AuthManagerPropTypes } from '@/lib/types';

import { Hydrate } from '@/elements';

export default function AuthManager({ children, session }) {
  return (
    <Hydrate loader={null}>
      <SessionProvider session={session} refetchWhenOffline refetchInterval={60} refetchOnWindowFocus>
        <SessionManager>{children}</SessionManager>
      </SessionProvider>
    </Hydrate>
  );
}

AuthManager.propTypes = AuthManagerPropTypes;

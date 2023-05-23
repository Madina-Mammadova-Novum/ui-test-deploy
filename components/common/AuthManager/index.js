'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthManager({ children }) {
  const updateSession = 5 * 60;

  return <SessionProvider refetchInterval={updateSession}>{children}</SessionProvider>;
}

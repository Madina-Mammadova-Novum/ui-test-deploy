'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthManager({ children }) {
  return (
    <SessionProvider refetchInterval={60 * 60 * 1000} basePath={process.env.NEXTAUTH_URL}>
      {children}
    </SessionProvider>
  );
}

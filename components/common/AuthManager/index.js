'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthManager({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

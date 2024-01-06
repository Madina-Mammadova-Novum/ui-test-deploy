'use client';

import { SessionProvider } from 'next-auth/react';

import { ProvidersPropTypes } from '@/lib/types';

import { StoreManager } from '@/common';
import Hydrate from '@/elements/Hydrate';

export default function Providers({ children }) {
  return (
    <Hydrate loader="page">
      <SessionProvider>
        <StoreManager>{children}</StoreManager>
      </SessionProvider>
    </Hydrate>
  );
}

Providers.propTypes = ProvidersPropTypes;

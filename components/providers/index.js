'use client';

import { ProvidersPropTypes } from '@/lib/types';

import { ExtraDataManager, SessionManager, StoreManager } from '@/common';

export default function Providers({ children }) {
  return (
    <StoreManager>
      <SessionManager />
      <ExtraDataManager />
      {children}
    </StoreManager>
  );
}

Providers.propTypes = ProvidersPropTypes;

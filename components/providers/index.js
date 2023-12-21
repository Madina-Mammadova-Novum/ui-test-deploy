'use client';

import { ProvidersPropTypes } from '@/lib/types';

import { StoreManager } from '@/common';

export default function Providers({ children }) {
  return <StoreManager>{children}</StoreManager>;
}

Providers.propTypes = ProvidersPropTypes;

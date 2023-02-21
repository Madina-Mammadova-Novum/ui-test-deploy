'use client';

import { ProviderManager } from '@/common';

export default function Providers({ children }) {
  return <ProviderManager>{children}</ProviderManager>;
}

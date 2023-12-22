'use client';

import { useRefreshSession } from '@/utils/hooks';

export function RootTemplate({ children }) {
  useRefreshSession();

  return children;
}

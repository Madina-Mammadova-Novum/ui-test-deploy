'use client';

import { useRefreshSession } from '@/utils/hooks';

export default function RootTemplate({ children }) {
  useRefreshSession();

  return children;
}

'use client';

import { useRefreshSession } from '@/utils/hooks';

export default function Template({ children }) {
  useRefreshSession();

  return children;
}

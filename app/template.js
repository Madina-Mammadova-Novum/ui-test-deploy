'use client';

import { ClientSidePackages } from '@/common';
import { Chat } from '@/modules';
import Providers from '@/providers';
import { getCookieFromBrowser } from '@/utils/helpers';

export default function RootTemplate({ children }) {
  const token = getCookieFromBrowser('session-access-token');

  return (
    <Providers loader="page">
      {children}
      <ClientSidePackages />
      <Chat token={token} />
    </Providers>
  );
}

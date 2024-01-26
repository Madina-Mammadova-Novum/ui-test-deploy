'use client';

import { ClientSidePackages } from '@/common';
import { Chat } from '@/modules';
import { getCookieFromBrowser } from '@/utils/helpers';

export default function RootTemplate({ children }) {
  const token = getCookieFromBrowser('session-access-token');

  return (
    <>
      {children}
      <ClientSidePackages />
      {token && <Chat token={token} />}
    </>
  );
}

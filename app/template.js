'use client';

import { usePathname } from 'next/navigation';

import { ClientSidePackages } from '@/common';
import { ROUTES } from '@/lib';
import { Chat } from '@/modules';
import { getCookieFromBrowser } from '@/utils/helpers';

export default function RootTemplate({ children }) {
  const token = getCookieFromBrowser('session-access-token');
  const pathname = usePathname();

  const unavailbleChatRoute = pathname === ROUTES.LOGIN || pathname === ROUTES.SIGNUP;

  return (
    <>
      {children}
      <ClientSidePackages />
      {!unavailbleChatRoute && <Chat token={token} />}
    </>
  );
}

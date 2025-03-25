'use client';

import { ToastContainer } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { NewRelicBrowser } from '@/common';
import { ROUTES } from '@/lib';
import { Chat } from '@/modules';
import { getCookieFromBrowser, getRoleIdentity } from '@/utils/helpers';

import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  const pathname = usePathname();
  const token = getCookieFromBrowser('session-access-token');
  const role = getCookieFromBrowser('session-user-role');

  const { isAnon = true } = getRoleIdentity({ role });

  const unavailableChatRoute = pathname === ROUTES.LOGIN || pathname === ROUTES.SIGNUP;
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && process.env.NODE_ENV === 'production';
  const isChatAvailable = !maintenanceMode && !unavailableChatRoute && !isAnon;

  // eslint-disable-next-line no-console
  console.log('ClientSidePackages');

  return (
    <>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={3500} hideProgressBar />
      {isChatAvailable && <Chat token={token} />}
      <NewRelicBrowser />
    </>
  );
};

export default ClientSidePackages;

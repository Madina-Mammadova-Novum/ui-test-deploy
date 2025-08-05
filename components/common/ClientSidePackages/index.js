'use client';

import { ToastContainer } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { CookieConsent, MatomoAnalytics, NewRelicBrowser } from '@/common';
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
  const showCookieConsent = pathname !== ROUTES.QR_REDIRECT;

  return (
    <>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={8000} hideProgressBar />
      {isChatAvailable && <Chat token={token} />}
      {showCookieConsent && <CookieConsent />}
      <NewRelicBrowser />
      <MatomoAnalytics />
    </>
  );
};

export default ClientSidePackages;

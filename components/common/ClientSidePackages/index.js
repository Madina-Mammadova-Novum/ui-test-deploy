'use client';

import { ToastContainer } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { ROUTES } from '@/lib';
import { Chat } from '@/modules';
import { getCookieFromBrowser } from '@/utils/helpers';

import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  const pathname = usePathname();
  const token = getCookieFromBrowser('session-access-token');

  const unavailbleChatRoute = pathname === ROUTES.LOGIN || pathname === ROUTES.SIGNUP;

  return (
    <>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={3500} hideProgressBar />
      {!unavailbleChatRoute && <Chat token={token} />}
    </>
  );
};

export default ClientSidePackages;

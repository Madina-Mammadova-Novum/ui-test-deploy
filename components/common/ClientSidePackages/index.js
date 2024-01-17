'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { chatNotificationService, globalNotificationService } from '@/services/signalR';
import { getCookieFromBrowser } from '@/utils/helpers';

import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  const token = getCookieFromBrowser('session-access-token');

  useEffect(() => {
    if (token) {
      globalNotificationService.init();
      chatNotificationService.init();
    }
  }, [token]);

  return (
    <>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={1000} hideProgressBar />
    </>
  );
};

export default ClientSidePackages;

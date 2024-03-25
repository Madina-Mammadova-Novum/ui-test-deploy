'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { ROUTES } from '@/lib';
import { Chat } from '@/modules';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { getCookieFromBrowser } from '@/utils/helpers';

import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const token = getCookieFromBrowser('session-access-token');

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchPorts());
  }, []);

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

'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { errorToast } from '@/utils/hooks';

const SessionManager = ({ children }) => {
  const { data, update } = useSession();

  const isExpired = Date.now() >= data?.expires;

  const updateSession = async () => {
    if (data?.accessToken) {
      try {
        const { data: token, error } = await refreshAccessToken({ token: data?.refreshToken });
        if (data) await update({ ...token });
        if (error) throw Error(error.message);
      } catch (err) {
        errorToast('Bad request', 'Access token was expired, please login again');
      }
    }
  };

  useEffect(() => {
    if (isExpired) {
      updateSession();
    }
  }, [isExpired]);

  return children;
};

export default SessionManager;

'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import { tokenAdapter } from '@/adapters/user';
import { refreshAccessToken } from '@/services';
import { errorToast, useExtraData } from '@/utils/hooks';

const SessionManager = ({ children }) => {
  const { data, update } = useSession();

  useExtraData({ role: data?.role });

  const updateSession = async () => {
    try {
      const { data: token, error } = await refreshAccessToken({ token: data?.refreshToken });

      await update(tokenAdapter({ data: token }));

      if (error) {
        throw Error(error.message);
      }
    } catch (err) {
      errorToast('Bad request', 'Access token was expired, please login again');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => updateSession(), 1000 * 60);
    return () => {
      if (document.visibilityState === 'visible') {
        clearInterval(interval);
      }
    };
  }, [updateSession]);

  return children;
};

export default SessionManager;

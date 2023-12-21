'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { tokenAdapter } from '@/adapters/user';
import { refreshAccessToken } from '@/services';
import { setRoleIdentity } from '@/store/entities/user/slice';
import { errorToast } from '@/utils/hooks';

const SessionManager = () => {
  const { data, update } = useSession();
  const dispatch = useDispatch();

  const isExpired = Date.now() >= data?.expires;

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
    if (isExpired) {
      updateSession();
    }

    if (data?.role) {
      dispatch(setRoleIdentity(data.role));
    }
  }, [isExpired, data]);
};

export default SessionManager;

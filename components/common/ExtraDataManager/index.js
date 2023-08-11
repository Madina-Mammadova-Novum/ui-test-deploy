'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';
import notificationService from '@/utils/signalr';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    await update({ ...refreshedData });
  }, [session?.refreshToken, update]);

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  }, [dispatch]);

  const setUserData = useCallback(
    ({ role = null, isValid = false }) => {
      dispatch(setRoleIdentity(role));
      dispatch(setIsAuthenticated(isValid));
    },
    [dispatch]
  );

  useEffect(() => {
    getGeneralData();

    if (session?.accessToken !== '') {
      notificationService.start();
      setUserData({ role: session?.role, isValid: true });
    } else {
      notificationService.stop();
      setUserData({ role: null, isValid: false });
    }

    if (Date.now() > session?.expires) {
      updateSession();
    }
  }, []);

  return children;
};

export default ExtraDataManager;

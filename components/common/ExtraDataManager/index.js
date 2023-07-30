/* eslint-disable no-return-await */

'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';
import signalRService from '@/utils/signalr';

const ExtraDataManager = ({ children }) => {
  const { data: session, update } = useSession();

  const dispatch = useDispatch();

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    return await update({ ...refreshedData });
  }, [session, update]);

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
    signalRService.start();

    signalRService.sendMessage({
      query: '',
      origin: '',
      isOpened: true,
      createdAt: '',
      skip: 0,
      take: 10,
    });
    return () => {
      signalRService.stop();
    };
  }, [getGeneralData]);

  useEffect(() => {
    if (session?.accessToken) setUserData({ role: session?.role, isValid: true });
    else setUserData({ role: null, isValid: false });
  }, [session?.accessToken, session?.role, setUserData]);

  useEffect(() => {
    if (Date.now() > session?.expires) {
      updateSession();
      getGeneralData();
    }
  }, [session?.expires, getGeneralData, updateSession]);

  return children;
};

export default ExtraDataManager;

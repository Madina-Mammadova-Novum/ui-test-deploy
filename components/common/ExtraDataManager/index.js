'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  }, []);

  const setUserData = useCallback(({ role = null, isValid = false }) => {
    dispatch(setRoleIdentity(role));
    dispatch(setIsAuthenticated(isValid));
  }, []);

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    await update({ ...refreshedData });
  }, [session?.refreshToken, update]);

  useEffect(() => {
    getGeneralData();
  }, []);

  useEffect(() => {
    if (session?.accessToken !== undefined) {
      setUserData({ role: session?.role, isValid: true });
    } else {
      setUserData({ role: null, isValid: false });
    }

    if (session?.expires <= Date.now()) updateSession();
  }, [session]);

  return children;
};

export default ExtraDataManager;

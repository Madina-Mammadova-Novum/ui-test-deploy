'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';
import { errorToast } from '@/utils/hooks';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const getGeneralData = () => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  };

  const setUserData = ({ role = null }) => {
    dispatch(setRoleIdentity(role));
  };

  const updateSession = async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    try {
      await update({ ...refreshedData });
    } catch (error) {
      errorToast('Updating session error:', error);
    }
  };

  const sessionValidity = () => {
    const isExpired = session?.expires <= Date.now();
    const isValid = session?.accessToken !== undefined && !isExpired;

    return { isValid, isExpired };
  };

  const sessionWatcher = async () => {
    try {
      const { isValid, isExpired } = sessionValidity();
      if (isValid) setUserData({ role: session?.role, isValid });
      if (isExpired) await updateSession();
    } catch (error) {
      setUserData({ role: null, isValid: false });
      errorToast('Session is not valid', error);
    }
  };

  useEffect(() => {
    getGeneralData();
  }, []);

  useEffect(() => {
    sessionWatcher();
  }, [session]);

  return children;
};

export default ExtraDataManager;

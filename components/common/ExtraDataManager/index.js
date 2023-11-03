'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';
import { sessionValidity } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const getGeneralData = () => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  };

  const setUserData = ({ role = null, isValid = false }) => {
    dispatch(setRoleIdentity(role));
    dispatch(setIsAuthenticated(isValid));
  };

  const updateSession = async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    try {
      await update({ ...refreshedData });
    } catch (error) {
      errorToast('Updating session error:', error);
    }
  };

  const sessionWatcher = async () => {
    try {
      const { isValid, isExpired } = await sessionValidity();
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

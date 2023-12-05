'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';
import { sessionValidity } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const { isValid, isExpired } = sessionValidity();

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

  const sessionWatcher = async () => {
    if (isValid) setUserData({ role: session?.role, isValid });
    if (isExpired) await updateSession();

    return setUserData({ role: null, isValid: false });
  };

  useEffect(() => {
    getGeneralData();
  }, []);

  useEffect(() => {
    sessionWatcher();
  }, [isExpired]);

  return children;
};

export default ExtraDataManager;
